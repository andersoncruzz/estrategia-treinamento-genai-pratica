package br.gov.am.semef.agendamentosala.mapper;

import br.gov.am.semef.agendamentosala.model.HorarioDisponivel;
import br.gov.am.semef.agendamentosala.dto.HorarioDisponivelDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import java.util.List;

@Mapper(componentModel = "spring")
public interface HorarioDisponivelMapper {
    HorarioDisponivelMapper INSTANCE = Mappers.getMapper(HorarioDisponivelMapper.class);
    HorarioDisponivelDTO toDto(HorarioDisponivel entity);
    HorarioDisponivel toEntity(HorarioDisponivelDTO dto);
    List<HorarioDisponivelDTO> toDtoList(List<HorarioDisponivel> entities);
}
