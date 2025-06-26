package br.gov.am.semef.agendamentosala.dto;

public class ReservaResponseDTO {
    private Long id;
    private Long salaId;
    private Long horarioDisponivelId;
    private String usuario;

    public ReservaResponseDTO() {}

    public ReservaResponseDTO(Long id, Long salaId, Long horarioDisponivelId, String usuario) {
        this.id = id;
        this.salaId = salaId;
        this.horarioDisponivelId = horarioDisponivelId;
        this.usuario = usuario;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getSalaId() { return salaId; }
    public void setSalaId(Long salaId) { this.salaId = salaId; }
    public Long getHorarioDisponivelId() { return horarioDisponivelId; }
    public void setHorarioDisponivelId(Long horarioDisponivelId) { this.horarioDisponivelId = horarioDisponivelId; }
    public String getUsuario() { return usuario; }
    public void setUsuario(String usuario) { this.usuario = usuario; }
}
