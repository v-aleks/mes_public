from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView # type: ignore
from . import base


urlpatterns = [
    path('admin/', admin.site.urls),
    path('lab/', include('lab.urls')),
    path('quality/', include('quality.urls')),
    path('production/', include('production.urls')),
    path('telemetry_workplaces/', include('telemetry_workplaces.urls')),
    path('telemetry_tube/', include('telemetry_tube.urls')),
    path('polls/', include('polls.urls')),
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/token/verify/', TokenVerifyView.as_view()),
    path('api/account/', include('account.urls')),
    path('sync/', base.SyncView.as_view())
    
]
