from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import RestricaoHorario, Agendamento, Servico
from .serializers import RestricaoHorarioSerializer, AgendamentoSerializer, ServicoSerializer

class ServicoViewSet(viewsets.ModelViewSet):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer
    permission_classes = [permissions.IsAdminUser]

class RestricaoHorarioViewSet(viewsets.ModelViewSet):
    queryset = RestricaoHorario.objects.all()
    serializer_class = RestricaoHorarioSerializer
    permission_classes = [permissions.IsAdminUser]

class AgendamentoViewSet(viewsets.ModelViewSet):
    queryset = Agendamento.objects.all()  # Corrigido: queryset explícito
    serializer_class = AgendamentoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Agendamento.objects.all()
        return Agendamento.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
