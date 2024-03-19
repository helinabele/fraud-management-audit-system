package org.audit.app.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.audit.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SubCityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubCity.class);
        SubCity subCity1 = new SubCity();
        subCity1.setId("id1");
        SubCity subCity2 = new SubCity();
        subCity2.setId(subCity1.getId());
        assertThat(subCity1).isEqualTo(subCity2);
        subCity2.setId("id2");
        assertThat(subCity1).isNotEqualTo(subCity2);
        subCity1.setId(null);
        assertThat(subCity1).isNotEqualTo(subCity2);
    }
}
