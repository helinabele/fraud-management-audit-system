package org.audit.app.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.audit.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SubCityDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubCityDTO.class);
        SubCityDTO subCityDTO1 = new SubCityDTO();
        subCityDTO1.setId("id1");
        SubCityDTO subCityDTO2 = new SubCityDTO();
        assertThat(subCityDTO1).isNotEqualTo(subCityDTO2);
        subCityDTO2.setId(subCityDTO1.getId());
        assertThat(subCityDTO1).isEqualTo(subCityDTO2);
        subCityDTO2.setId("id2");
        assertThat(subCityDTO1).isNotEqualTo(subCityDTO2);
        subCityDTO1.setId(null);
        assertThat(subCityDTO1).isNotEqualTo(subCityDTO2);
    }
}
