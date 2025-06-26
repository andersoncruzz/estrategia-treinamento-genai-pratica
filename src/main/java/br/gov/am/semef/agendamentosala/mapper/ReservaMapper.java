package br.gov.am.semef.agendamentosala.mapper;

import br.gov.am.semef.agendamentosala.model.Reserva;
import br.gov.am.semef.agendamentosala.dto.ReservaDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ReservaMapper {
    ReservaMapper INSTANCE = Mappers.getMapper(ReservaMapper.class);

    @Mapping(source = "sala.id", target = "salaId")
    @Mapping(source = "horarioDisponivel.id", target = "horarioDisponivelId")
    ReservaDTO toDto(Reserva entity);

    @Mapping(source = "salaId", target = "sala.id")
    @Mapping(source = "horarioDisponivelId", target = "horarioDisponivel.id")
    Reserva toEntity(ReservaDTO dto);

    List<ReservaDTO> toDtoList(List<Reserva> entities);
}
