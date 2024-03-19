package org.audit.app.service.mapper;

import org.audit.app.domain.Branch;
import org.audit.app.domain.City;
import org.audit.app.domain.Department;
import org.audit.app.domain.Division;
import org.audit.app.domain.Region;
import org.audit.app.domain.SubCity;
import org.audit.app.domain.WhistleBlowerReport;
import org.audit.app.service.dto.BranchDTO;
import org.audit.app.service.dto.CityDTO;
import org.audit.app.service.dto.DepartmentDTO;
import org.audit.app.service.dto.DivisionDTO;
import org.audit.app.service.dto.RegionDTO;
import org.audit.app.service.dto.SubCityDTO;
import org.audit.app.service.dto.WhistleBlowerReportDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link WhistleBlowerReport} and its DTO {@link WhistleBlowerReportDTO}.
 */
@Mapper(componentModel = "spring")
public interface WhistleBlowerReportMapper extends EntityMapper<WhistleBlowerReportDTO, WhistleBlowerReport> {
    @Mapping(target = "division", source = "division", qualifiedByName = "divisionDivisionName")
    @Mapping(target = "department", source = "department", qualifiedByName = "departmentDepartmentName")
    @Mapping(target = "branch", source = "branch", qualifiedByName = "branchBranchName")
    @Mapping(target = "region", source = "region", qualifiedByName = "regionRegionName")
    @Mapping(target = "city", source = "city", qualifiedByName = "cityCityName")
    @Mapping(target = "subCity", source = "subCity", qualifiedByName = "subCitySubCityName")
    WhistleBlowerReportDTO toDto(WhistleBlowerReport s);

    @Named("divisionDivisionName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "divisionName", source = "divisionName")
    DivisionDTO toDtoDivisionDivisionName(Division division);

    @Named("departmentDepartmentName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "departmentName", source = "departmentName")
    DepartmentDTO toDtoDepartmentDepartmentName(Department department);

    @Named("branchBranchName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "branchName", source = "branchName")
    BranchDTO toDtoBranchBranchName(Branch branch);

    @Named("regionRegionName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "regionName", source = "regionName")
    RegionDTO toDtoRegionRegionName(Region region);

    @Named("cityCityName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "cityName", source = "cityName")
    CityDTO toDtoCityCityName(City city);

    @Named("subCitySubCityName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "subCityName", source = "subCityName")
    SubCityDTO toDtoSubCitySubCityName(SubCity subCity);
}
