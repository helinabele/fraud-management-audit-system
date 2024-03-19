package org.audit.app.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SubCityMapperTest {

    private SubCityMapper subCityMapper;

    @BeforeEach
    public void setUp() {
        subCityMapper = new SubCityMapperImpl();
    }
}
