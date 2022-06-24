from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response

from core.models import Exercise, Workout, Profile
from core.permissions import IsOwner
from core.serializers import ExerciseSerializer, WorkoutSerializer, ProfileSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, IsOwner)
    http_method_names = ['get', 'post']
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user.id)


class ExerciseViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    http_method_names = ['get', 'post', 'delete']
    serializer_class = ExerciseSerializer
    queryset = Exercise.objects.all()

    def get_queryset(self):
        return self.queryset.filter(Q(user=self.request.user.id) | Q(user=None)).order_by('name')

    @action(detail=False, methods=['get'])
    def body_parts(self, request):
        return Response(Exercise.body_part_list, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def equipment(self, request):
        return Response(Exercise.equipment_list, status=status.HTTP_200_OK)


class WorkoutViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, IsOwner,)
    http_method_names = ['get', 'post', 'delete']
    serializer_class = WorkoutSerializer
    queryset = Workout.objects.all().order_by('-created')

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user.id)
