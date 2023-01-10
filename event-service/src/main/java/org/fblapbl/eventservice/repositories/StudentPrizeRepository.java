package org.fblapbl.eventservice.repositories;

import org.fblapbl.eventservice.entities.StudentPrizeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface StudentPrizeRepository extends JpaRepository<StudentPrizeEntity, UUID> {
    @Query(nativeQuery = true, value = "SELECT * FROM student_prize s WHERE s.student_id = :studentId")
    List<StudentPrizeEntity> findAllByStudentId(UUID studentId);
}
