from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.functional import classproperty

from common.models import IndexedTimeStampedModel
from user.models import User


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    """
    Create OneToOne instance of Profile on User instance creation
    """
    if created:
        Profile.objects.create(user=instance)


class Profile(models.Model):
    WEIGHT_SYSTEMS = (
        ('kg', 'kg'),
        ('lbs', 'lbs'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    weight_system = models.CharField(max_length=8, choices=WEIGHT_SYSTEMS, default=WEIGHT_SYSTEMS[0][0])

    def __str__(self):
        return f"Profile(user={self.user.username}, weight_system={self.weight_system})"


class Exercise(models.Model):
    BODY_PARTS = (
        ('Forearms', 'Forearms'),
        ('Triceps', 'Triceps'),
        ('Biceps', 'Biceps'),
        ('Neck', 'Neck'),
        ('Shoulders', 'Shoulders'),
        ('Chest', 'Chest'),
        ('Back', 'Back'),
        ('Core', 'Core'),
        ('Upper Legs', 'Upper Legs'),
        ('Glutes', 'Glutes'),
        ('Calves', 'Calves'),
        ('Full Body', 'Full Body'),
        ('Other', 'Other'),
    )
    EQUIPMENT = (
        ('Barbell', 'Barbell'),
        ('Dumbbell', 'Dumbbell'),
        ('Machine', 'Machine'),
        ('Bodyweight', 'Bodyweight'),
        ('Bands', 'Bands'),
        ('Cardio', 'Cardio'),
        ('Other', 'Other'),
    )

    body_part = models.CharField(max_length=16, choices=BODY_PARTS)
    equipment = models.CharField(max_length=16, choices=EQUIPMENT)
    name = models.CharField(max_length=64)
    description = models.TextField(max_length=512, blank=True, null=True)
    user = models.ForeignKey(User, related_name="exercises", on_delete=models.CASCADE, blank=True, null=True)

    @classproperty
    def body_part_list(self):
        return [item[0] for item in self.BODY_PARTS]

    @classproperty
    def equipment_list(self):
        return [item[0] for item in self.EQUIPMENT]

    class Meta:
        unique_together = ('body_part', 'equipment', 'name')

    def __str__(self):
        return f"Exercise(body_part={self.body_part}, equipment={self.equipment}, name={self.name}, user={self.user}')"


class Workout(IndexedTimeStampedModel):
    STATUSES = (
        ('Started', 'Started'),
        ('Finished', 'Finished'),
        ('Template', 'Template'),
    )

    user = models.ForeignKey(User, related_name="workouts", on_delete=models.CASCADE)
    status = models.CharField(max_length=8, choices=STATUSES, default=STATUSES[0][0])

    def __str__(self):
        return f"Workout(user={self.user.username}, created={self.created})"


class WorkoutExercise(models.Model):
    workout = models.ForeignKey(Workout, related_name="workout_exercises", on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)

    def __str__(self):
        return f"WorkoutExercise(workout={self.workout.user.username}, exercise={self.exercise.name})"


class WorkoutExerciseDetail(models.Model):
    workout_exercise = models.ForeignKey(WorkoutExercise, related_name="workout_exercise_details",
                                         on_delete=models.CASCADE)
    sets = models.PositiveIntegerField()
    reps = models.PositiveIntegerField()
    weight = models.PositiveIntegerField()

    def __str__(self):
        return f"WorkoutExerciseDetail(workout_exercise={self.workout_exercise.exercise.name}, " \
               f"sets={self.sets}, reps={self.reps}, weight={self.weight})"
