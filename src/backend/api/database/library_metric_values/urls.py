from django.urls import path
from .views import (
    LibraryMetricValueCreateOrUpdateView,
    LibraryMetricValueRetrieveView,
    LibraryMetricTableView
)

urlpatterns = [
    path('create-or-update/', LibraryMetricValueCreateOrUpdateView.as_view(), name='library-metric-create-update'),
    path('get/', LibraryMetricValueRetrieveView.as_view(), name='library-metric-get'),
    path('table/', LibraryMetricTableView.as_view(), name='library-metric-table'),
]
