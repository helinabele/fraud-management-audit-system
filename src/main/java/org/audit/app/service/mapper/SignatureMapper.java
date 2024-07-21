package org.audit.app.service.mapper;

import org.audit.app.service.dto.SignatureDTO;
import org.mapstruct.Mapper;
import org.audit.app.domain.Signature;

/**
 * Mapper for the entity {@link Signature} and its DTO
 * {@link SignatureDTO}
 */
@Mapper(componentModel = "spring")
public interface SignatureMapper extends EntityMapper<SignatureDTO, Signature> {}
