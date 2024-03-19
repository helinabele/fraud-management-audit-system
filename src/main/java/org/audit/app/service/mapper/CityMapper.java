package org.audit.app.service.mapper;

import org.audit.app.domain.City;
import org.audit.app.domain.Region;
import org.audit.app.service.dto.CityDTO;
import org.audit.app.service.dto.RegionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link City} and its DTO {@link CityDTO}.
 */
@Mapper(componentModel = "spring")
public interface CityMapper extends EntityMapper<CityDTO, City> {
    @Mapping(target = "region", source = "region", qualifiedByName = "regionRegionName")
    CityDTO toDto(City s);

    @Named("regionRegionName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "regionName", source = "regionName")
    RegionDTO toDtoRegionRegionName(Region region);
}
