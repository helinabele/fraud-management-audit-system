package org.audit.app.repository;

import java.util.List;
import java.util.Optional;
import org.audit.app.domain.WhistleBlowerReport;
import org.audit.app.service.dto.WhistleBlowerReportDTO;
import org.audit.app.service.impl.ReportStatus;
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

    // Optional<WhistleBlowerReportDTO> findByReportStatus(String reportStatus);
    List<WhistleBlowerReportDTO> findByReportStatus(ReportStatus reportStatus);

}
