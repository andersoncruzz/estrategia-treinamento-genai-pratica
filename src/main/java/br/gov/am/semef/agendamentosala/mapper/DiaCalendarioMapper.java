package br.gov.am.semef.agendamentosala.mapper;

import br.gov.am.semef.agendamentosala.model.DiaCalendario;
import br.gov.am.semef.agendamentosala.dto.DiaCalendarioDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import java.util.List;

@Mapper(componentModel = "spring")
public interface DiaCalendarioMapper {
    DiaCalendarioMapper INSTANCE = Mappers.getMapper(DiaCalendarioMapper.class);
    DiaCalendarioDTO toDto(DiaCalendario dia);
    DiaCalendario toEntity(DiaCalendarioDTO dto);
    List<DiaCalendarioDTO> toDtoList(List<DiaCalendario> dias);
}
