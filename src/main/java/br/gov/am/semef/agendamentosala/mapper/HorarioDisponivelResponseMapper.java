package br.gov.am.semef.agendamentosala.mapper;

import br.gov.am.semef.agendamentosala.model.HorarioDisponivel;
import br.gov.am.semef.agendamentosala.dto.HorarioDisponivelResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import java.util.List;

@Mapper(componentModel = "spring")
public interface HorarioDisponivelResponseMapper {
    HorarioDisponivelResponseMapper INSTANCE = Mappers.getMapper(HorarioDisponivelResponseMapper.class);
    HorarioDisponivelResponseDTO toResponseDto(HorarioDisponivel entity);
    List<HorarioDisponivelResponseDTO> toResponseDtoList(List<HorarioDisponivel> entities);
}
