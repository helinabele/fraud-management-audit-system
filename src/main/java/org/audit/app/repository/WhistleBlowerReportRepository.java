package org.audit.app.repository;

import org.audit.app.domain.WhistleBlowerReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the WhistleBlowerReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WhistleBlowerReportRepository extends MongoRepository<WhistleBlowerReport, String> {}
