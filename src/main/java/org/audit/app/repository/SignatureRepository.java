package org.audit.app.repository;

import org.audit.app.domain.Signature;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
/**
 * Spring Data MongoDB repository for Signature entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SignatureRepository extends MongoRepository<Signature, String> {}
