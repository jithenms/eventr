package com.example.events.eventapp.repositories;

import com.example.events.eventapp.entities.EventEntity;
import com.example.events.eventapp.entities.TeacherEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface EventRepository extends JpaRepository<EventEntity, UUID> {
    @Query(nativeQuery = true, value = "SELECT * FROM event e WHERE e.teacher_id = :id")
    List<EventEntity> getAllByTeacherId(UUID id);
}
