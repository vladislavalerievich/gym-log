from django.test import TestCase

from user.models import User


class AuthTestCase(TestCase):
    def setUp(self):
        self.u = User.objects.create_user('test@mail.com', 'test', 'pass')
        self.u.is_staff = True
        self.u.is_superuser = True
        self.u.is_active = True
        self.u.save()

    def testLogin(self):
        self.client.login(username='test', password='pass')
