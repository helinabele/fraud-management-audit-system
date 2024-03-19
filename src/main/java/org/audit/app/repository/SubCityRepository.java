package org.audit.app.repository;

import java.util.List;
import java.util.Optional;
import org.audit.app.domain.SubCity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the SubCity entity.
 */
@Repository
public interface SubCityRepository extends MongoRepository<SubCity, String> {
    @Query("{}")
    Page<SubCity> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<SubCity> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<SubCity> findOneWithEagerRelationships(String id);
}
