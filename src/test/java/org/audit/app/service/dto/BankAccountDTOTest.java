package org.audit.app.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.audit.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BankAccountDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BankAccountDTO.class);
        BankAccountDTO bankAccountDTO1 = new BankAccountDTO();
        bankAccountDTO1.setId("id1");
        BankAccountDTO bankAccountDTO2 = new BankAccountDTO();
        assertThat(bankAccountDTO1).isNotEqualTo(bankAccountDTO2);
        bankAccountDTO2.setId(bankAccountDTO1.getId());
        assertThat(bankAccountDTO1).isEqualTo(bankAccountDTO2);
        bankAccountDTO2.setId("id2");
        assertThat(bankAccountDTO1).isNotEqualTo(bankAccountDTO2);
        bankAccountDTO1.setId(null);
        assertThat(bankAccountDTO1).isNotEqualTo(bankAccountDTO2);
    }
}
