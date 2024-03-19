package org.audit.app.repository;

import java.util.List;
import java.util.Optional;
import org.audit.app.domain.City;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the City entity.
 */
@Repository
public interface CityRepository extends MongoRepository<City, String> {
    @Query("{}")
    Page<City> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<City> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<City> findOneWithEagerRelationships(String id);
}
