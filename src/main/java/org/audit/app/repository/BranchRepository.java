package org.audit.app.repository;

import java.util.List;
import java.util.Optional;
import org.audit.app.domain.Branch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Branch entity.
 */
@Repository
public interface BranchRepository extends MongoRepository<Branch, String> {
    @Query("{}")
    Page<Branch> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Branch> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Branch> findOneWithEagerRelationships(String id);
}
