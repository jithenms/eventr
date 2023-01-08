package org.fblapbl.eventservice.repositories;

import org.fblapbl.eventservice.entities.StudentEntity;
import org.fblapbl.eventservice.graphql.types.Student;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, UUID> {
    @Query(nativeQuery = true, value = "SELECT * FROM student s WHERE s.auth_id = :authId")
    StudentEntity getByAuthId(String authId);

    @Query(nativeQuery = true, value = "SELECT * FROM student s WHERE s.school_id = :schoolId")
    List<StudentEntity> findAllBySchoolId(UUID schoolId, Sort sort);
}
