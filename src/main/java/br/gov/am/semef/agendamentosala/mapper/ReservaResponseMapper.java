package br.gov.am.semef.agendamentosala.mapper;

import br.gov.am.semef.agendamentosala.model.Reserva;
import br.gov.am.semef.agendamentosala.dto.ReservaResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ReservaResponseMapper {
    ReservaResponseMapper INSTANCE = Mappers.getMapper(ReservaResponseMapper.class);

    @Mapping(source = "sala.id", target = "salaId")
    @Mapping(source = "horarioDisponivel.id", target = "horarioDisponivelId")
    ReservaResponseDTO toResponseDto(Reserva entity);
    List<ReservaResponseDTO> toResponseDtoList(List<Reserva> entities);
}
