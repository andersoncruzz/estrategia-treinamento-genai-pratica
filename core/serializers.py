from rest_framework import serializers
from .models import RestricaoHorario, Agendamento, Servico

class ServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servico
        fields = '__all__'

class RestricaoHorarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestricaoHorario
        fields = '__all__'

class AgendamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agendamento
        fields = '__all__'
