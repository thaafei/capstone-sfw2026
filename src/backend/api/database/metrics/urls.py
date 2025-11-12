from django.urls import path
from .views import MetricListCreateView, MetricUpdateWeightView

urlpatterns = [
    path('', MetricListCreateView.as_view(), name='metric-list-create'),
    path('<uuid:pk>/update-weight/', MetricUpdateWeightView.as_view(), name='metric-update-weight'),
]
