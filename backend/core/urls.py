from rest_framework.routers import SimpleRouter

from core.views import ProfileViewSet, ExerciseViewSet, WorkoutViewSet

core_router = SimpleRouter()

core_router.register(r'profile', ProfileViewSet, basename='profile')
core_router.register(r'exercise', ExerciseViewSet, basename='exercise')
core_router.register(r'workout', WorkoutViewSet, basename='workout')
