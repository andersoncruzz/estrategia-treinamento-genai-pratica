from django.contrib.auth.models import User
from django.db import models

class Servico(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True)

    def __str__(self):
        return self.nome

class RestricaoHorario(models.Model):
    """Restrição de dias e horários definida pelo administrador."""
    dia_semana = models.IntegerField(choices=[(i, d) for i, d in enumerate([
        'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'])])
    hora_inicio = models.TimeField()
    hora_fim = models.TimeField()

    def __str__(self):
        return f"{self.get_dia_semana_display()} {self.hora_inicio} - {self.hora_fim}"

class Agendamento(models.Model):
    """Agendamento feito pelo usuário, podendo ser para um ou vários dias."""
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    servico = models.ForeignKey(Servico, on_delete=models.CASCADE, related_name='agendamentos')
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.usuario.username}: {self.servico} ({self.criado_em})"

class PeriodoAgendamento(models.Model):
    agendamento = models.ForeignKey(Agendamento, on_delete=models.CASCADE, related_name='periodos')
    data = models.DateField()
    hora_inicio = models.TimeField()
    hora_fim = models.TimeField()

    def __str__(self):
        return f"{self.data} {self.hora_inicio}-{self.hora_fim}"
