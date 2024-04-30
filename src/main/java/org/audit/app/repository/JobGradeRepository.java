package org.audit.app.repository;

import org.audit.app.domain.JobGrade;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the JobGrade entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JobGradeRepository extends MongoRepository<JobGrade, String> {}
