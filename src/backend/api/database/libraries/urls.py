from django.urls import path
from .views import LibraryListCreateView

urlpatterns = [
    path('', LibraryListCreateView.as_view(), name='library-list'),
]
