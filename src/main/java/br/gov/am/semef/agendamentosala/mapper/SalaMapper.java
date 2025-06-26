package br.gov.am.semef.agendamentosala.mapper;

import br.gov.am.semef.agendamentosala.model.Sala;
import br.gov.am.semef.agendamentosala.dto.SalaDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import java.util.List;

@Mapper(componentModel = "spring")
public interface SalaMapper {
    SalaMapper INSTANCE = Mappers.getMapper(SalaMapper.class);
    SalaDTO toDto(Sala sala);
    Sala toEntity(SalaDTO salaDTO);
    List<SalaDTO> toDtoList(List<Sala> salas);
}
