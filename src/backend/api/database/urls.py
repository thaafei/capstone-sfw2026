from django.urls import path, include

urlpatterns = [
    path('libraries/', include('database.libraries.urls')),
    path('metrics/', include('database.metrics.urls')),
    path('library-metrics/', include('database.library_metric_values.urls')),
]
