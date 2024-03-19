package org.audit.app.repository;

import org.audit.app.domain.Division;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Division entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DivisionRepository extends MongoRepository<Division, String> {}
