package br.gov.am.semef.agendamentosala.mapper;

import br.gov.am.semef.agendamentosala.model.DiaCalendario;
import br.gov.am.semef.agendamentosala.dto.DiaCalendarioResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import java.util.List;

@Mapper(componentModel = "spring")
public interface DiaCalendarioResponseMapper {
    DiaCalendarioResponseMapper INSTANCE = Mappers.getMapper(DiaCalendarioResponseMapper.class);
    DiaCalendarioResponseDTO toResponseDto(DiaCalendario entity);
    List<DiaCalendarioResponseDTO> toResponseDtoList(List<DiaCalendario> entities);
}
