from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import LibraryMetricValue
from .serializers import LibraryMetricValueSerializer
from libraries.models import Library
from metrics.models import Metric

# Create or Update a value
class LibraryMetricValueCreateOrUpdateView(APIView):
    """
    Create or update a LibraryMetricValue given library and metric.
    """
    def post(self, request):
        library_id = request.data.get('library')
        metric_id = request.data.get('metric')
        value = request.data.get('value')

        if not (library_id and metric_id and value is not None):
            return Response({'error': 'library, metric, and value are required.'}, status=status.HTTP_400_BAD_REQUEST)

        obj, created = LibraryMetricValue.objects.update_or_create(
            library_id=library_id,
            metric_id=metric_id,
            defaults={'value': value}
        )

        serializer = LibraryMetricValueSerializer(obj)
        return Response({
            'message': 'Created' if created else 'Updated',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


# Retrieve a value by library and metric
class LibraryMetricValueRetrieveView(APIView):
    """
    Retrieve a LibraryMetricValue given library and metric.
    """
    def get(self, request):
        library_id = request.query_params.get('library')
        metric_id = request.query_params.get('metric')

        if not (library_id and metric_id):
            return Response({'error': 'library and metric query params are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            obj = LibraryMetricValue.objects.get(library_id=library_id, metric_id=metric_id)
            serializer = LibraryMetricValueSerializer(obj)
            return Response(serializer.data)
        except LibraryMetricValue.DoesNotExist:
            return Response({'message': 'No value found for this library and metric.'}, status=status.HTTP_204_NO_CONTENT)


# Return all values as a table (frontend use)
class LibraryMetricTableView(APIView):
    """
    Returns a table where rows = libraries, columns = metrics.
    """
    def get(self, request):
        libraries = Library.objects.all()
        metrics = Metric.objects.all()
        table = []

        for lib in libraries:
            row = {'library_id': str(lib.Library_ID), 'library_name': lib.Library_Name}
            for metric in metrics:
                try:
                    val = LibraryMetricValue.objects.get(library=lib, metric=metric)
                    row[metric.metric_name] = val.value
                except LibraryMetricValue.DoesNotExist:
                    row[metric.metric_name] = None
            table.append(row)

        return Response(table)
