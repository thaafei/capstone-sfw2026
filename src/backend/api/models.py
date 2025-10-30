from django.db import models
import uuid

class Role(models.Model):
    Role_ID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    Role_Name = models.CharField(max_length=50)

    def __str__(self):
        return self.Role_Name


class User(models.Model):
    User_ID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    Name = models.CharField(max_length=100)
    Email = models.EmailField(unique=True)
    Role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)
    Created_At = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.Name


class Domain(models.Model):
    Domain_ID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    Domain_Name = models.CharField(max_length=100)
    Description = models.CharField(max_length=255, blank=True)
    Created_At = models.DateTimeField(auto_now_add=True)
    Created_By = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.Domain_Name


class Library(models.Model):
    Library_ID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    Domain = models.ForeignKey(Domain, on_delete=models.CASCADE, related_name='libraries')
    Library_Name = models.CharField(max_length=100)
    Programming_Language = models.CharField(max_length=50, blank=True)
    Created_At = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.Library_Name
class Metric(models.Model):
    Metric_ID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    Metric_Name = models.CharField(max_length=100)
    Description = models.CharField(max_length=255, blank=True, null=True)
    Category = models.CharField(max_length=50, blank=True, null=True)
    Weight = models.FloatField(default=1.0)
    Created_At = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.Metric_Name
class LibraryMetricValue(models.Model):
    Value_ID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    Library = models.ForeignKey(Library, on_delete=models.CASCADE)
    Metric = models.ForeignKey(Metric, on_delete=models.CASCADE)

    Value = models.FloatField(default=0)
    Evidence = models.TextField(blank=True, null=True)
    Collected_By = models.CharField(max_length=100, blank=True, null=True)
    Last_Modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.Library.Library_Name} - {self.Metric.Metric_Name}: {self.Value}"

