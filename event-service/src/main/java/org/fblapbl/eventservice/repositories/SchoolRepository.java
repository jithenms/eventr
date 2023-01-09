package org.fblapbl.eventservice.repositories;

import org.fblapbl.eventservice.entities.SchoolEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SchoolRepository extends JpaRepository<SchoolEntity, UUID> {
    @Query(nativeQuery = true, value = "SELECT * FROM school s WHERE s.code = :code")
    SchoolEntity findByCode(String code);
}
