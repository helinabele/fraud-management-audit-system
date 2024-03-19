package org.audit.app.service.mapper;

import org.audit.app.domain.City;
import org.audit.app.domain.SubCity;
import org.audit.app.service.dto.CityDTO;
import org.audit.app.service.dto.SubCityDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link SubCity} and its DTO {@link SubCityDTO}.
 */
@Mapper(componentModel = "spring")
public interface SubCityMapper extends EntityMapper<SubCityDTO, SubCity> {
    @Mapping(target = "city", source = "city", qualifiedByName = "cityCityName")
    SubCityDTO toDto(SubCity s);

    @Named("cityCityName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "cityName", source = "cityName")
    CityDTO toDtoCityCityName(City city);
}
