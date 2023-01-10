package org.fblapbl.eventservice.repositories;

import org.fblapbl.eventservice.entities.TeacherEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TeacherRepository extends JpaRepository<TeacherEntity, UUID> {
}
