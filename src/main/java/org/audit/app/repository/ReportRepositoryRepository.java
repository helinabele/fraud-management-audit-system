package org.audit.app.repository;

import org.audit.app.domain.ReportRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
/**
 * Spring Data MongoDB repository for Report Repository entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReportRepositoryRepository extends MongoRepository<ReportRepository, String> {}
