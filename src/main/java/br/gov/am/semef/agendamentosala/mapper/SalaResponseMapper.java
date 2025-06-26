package br.gov.am.semef.agendamentosala.mapper;

import br.gov.am.semef.agendamentosala.model.Sala;
import br.gov.am.semef.agendamentosala.dto.SalaResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import java.util.List;

@Mapper(componentModel = "spring")
public interface SalaResponseMapper {
    SalaResponseMapper INSTANCE = Mappers.getMapper(SalaResponseMapper.class);
    SalaResponseDTO toResponseDto(Sala entity);
    List<SalaResponseDTO> toResponseDtoList(List<Sala> entities);
}
