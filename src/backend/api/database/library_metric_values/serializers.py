from rest_framework import serializers
from .models import LibraryMetricValue

class LibraryMetricValueSerializer(serializers.ModelSerializer):
    library_name = serializers.CharField(source='library.Library_Name', read_only=True)
    metric_name = serializers.CharField(source='metric.metric_name', read_only=True)

    class Meta:
        model = LibraryMetricValue
        fields = ['value_ID', 'library', 'metric', 'library_name', 'metric_name', 'value', 'evidence', 'collected_by', 'last_modified']
