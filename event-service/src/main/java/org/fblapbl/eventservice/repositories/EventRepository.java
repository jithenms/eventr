package org.fblapbl.eventservice.repositories;

import org.fblapbl.eventservice.entities.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<EventEntity, UUID> {
    @Query(nativeQuery = true, value = "SELECT * FROM event e WHERE e.school_id = :schoolId")
    List<EventEntity> findAllBySchoolId(UUID schoolId);

    @Query(nativeQuery = true, value = "SELECT * FROM event e WHERE e.teacher_id = :teacherId")
    List<EventEntity> getAllByTeacherId(UUID teacherId);

    @Query(nativeQuery = true, value = "SELECT * FROM event e WHERE e.school_id = :schoolId AND e.id = :eventId")
    EventEntity findBySchoolIdAndEventId(UUID schoolId, UUID eventId);
}
