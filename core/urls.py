from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RestricaoHorarioViewSet, AgendamentoViewSet, ServicoViewSet

router = DefaultRouter()
router.register(r'servicos', ServicoViewSet)
router.register(r'restricoes', RestricaoHorarioViewSet)
router.register(r'agendamentos', AgendamentoViewSet, basename='agendamento')

urlpatterns = [
    path('', include(router.urls)),
]
