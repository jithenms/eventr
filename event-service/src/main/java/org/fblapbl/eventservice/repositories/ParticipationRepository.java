package org.fblapbl.eventservice.repositories;

import org.fblapbl.eventservice.entities.EventEntity;
import org.fblapbl.eventservice.entities.ParticipationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ParticipationRepository extends JpaRepository<ParticipationEntity, UUID> {
    @Query(nativeQuery = true, value = "SELECT * FROM participation p WHERE p.event_id = :eventId AND p.student_id = :studentId")
    ParticipationEntity findByEventIdAndStudentId(UUID eventId, UUID studentId);

    @Query("SELECT p FROM ParticipationEntity p WHERE p.student.id = :studentId")
    List<ParticipationEntity> findAllByStudentId(UUID studentId);

    @Query("SELECT p FROM ParticipationEntity p WHERE p.event.id = :eventId")
    List<ParticipationEntity> findAllByEventId(UUID eventId);
}