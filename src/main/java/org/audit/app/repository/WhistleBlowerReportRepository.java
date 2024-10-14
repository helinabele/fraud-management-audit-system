package org.audit.app.repository;

import java.util.List;
import java.util.Optional;

import org.audit.app.domain.enumeration.ReportStatus;
import org.audit.app.domain.WhistleBlowerReport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the WhistleBlowerReport entity.
 */
@Repository
public interface WhistleBlowerReportRepository extends MongoRepository<WhistleBlowerReport, String> {
    @Query("{}")
    Page<WhistleBlowerReport> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<WhistleBlowerReport> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<WhistleBlowerReport> findOneWithEagerRelationships(String id);
    
    Optional<WhistleBlowerReport> findByTrackingNumber(String trackingNumber);

    List<WhistleBlowerReport> findByReportStatus(ReportStatus reportStatus);
    
    List<WhistleBlowerReport> findByReportStatus(String status);
    
}
