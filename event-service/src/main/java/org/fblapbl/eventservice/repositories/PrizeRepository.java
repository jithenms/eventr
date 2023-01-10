package org.fblapbl.eventservice.repositories;

import org.fblapbl.eventservice.entities.PrizeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PrizeRepository extends JpaRepository<PrizeEntity, UUID> {
    @Query(nativeQuery = true, value = "SELECT * FROM prize p WHERE p.school_id = :schoolId")
    List<PrizeEntity> findAllBySchoolId(UUID schoolId);
}