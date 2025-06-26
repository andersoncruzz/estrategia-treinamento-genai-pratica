from django.contrib import admin
from .models import RestricaoHorario, Agendamento, Servico, PeriodoAgendamento

@admin.register(Servico)
class ServicoAdmin(admin.ModelAdmin):
    list_display = ("nome", "descricao")

@admin.register(RestricaoHorario)
class RestricaoHorarioAdmin(admin.ModelAdmin):
    list_display = ("dia_semana", "hora_inicio", "hora_fim")
    list_filter = ("dia_semana",)

class PeriodoAgendamentoInline(admin.TabularInline):
    model = PeriodoAgendamento
    extra = 1

@admin.register(Agendamento)
class AgendamentoAdmin(admin.ModelAdmin):
    list_display = ("usuario", "servico", "criado_em")
    list_filter = ("usuario", "servico")
    inlines = [PeriodoAgendamentoInline]
