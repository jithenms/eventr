package org.fblapbl.eventservice.repositories;

import org.fblapbl.eventservice.entities.StudentEventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface StudentEventRepository extends JpaRepository<StudentEventEntity, UUID> {
    @Query(nativeQuery = true, value = "SELECT * FROM student_event e WHERE e.event_id = :eventId AND e.student_id = :studentId")
    StudentEventEntity findByEventIdAndStudentId(UUID eventId, UUID studentId);

    @Query(nativeQuery = true, value = "SELECT * FROM student_event e WHERE e.student_id = :studentId")
    List<StudentEventEntity> findAllByStudentId(UUID studentId);
}
