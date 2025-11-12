from rest_framework import generics
from .models import Library
from .serializers import LibrarySerializer

class LibraryListCreateView(generics.ListCreateAPIView):
    queryset = Library.objects.all()
    serializer_class = LibrarySerializer
