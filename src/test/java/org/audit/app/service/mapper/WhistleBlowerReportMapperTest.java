package org.audit.app.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class WhistleBlowerReportMapperTest {

    private WhistleBlowerReportMapper whistleBlowerReportMapper;

    @BeforeEach
    public void setUp() {
        whistleBlowerReportMapper = new WhistleBlowerReportMapperImpl();
    }
}
