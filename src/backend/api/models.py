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
