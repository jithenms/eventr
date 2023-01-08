package org.fblapbl.eventservice.services;

import org.fblapbl.eventservice.entities.*;
import org.fblapbl.eventservice.graphql.types.CreateEventInput;
import org.fblapbl.eventservice.graphql.types.Event;
import org.fblapbl.eventservice.repositories.EventRepository;
import org.fblapbl.eventservice.repositories.StudentEventRepository;
import org.fblapbl.eventservice.repositories.StudentRepository;
import org.fblapbl.eventservice.repositories.TeacherRepository;
import org.fblapbl.eventservice.util.Converters;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class EventService {
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final EventRepository eventRepository;
    private final StudentEventRepository studentEventRepository;


    public EventService(TeacherRepository teacherRepository, StudentRepository studentRepository, EventRepository eventRepository, StudentEventRepository studentEventRepository) {
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.eventRepository = eventRepository;
        this.studentEventRepository = studentEventRepository;
    }

    public Event getEvent(String eventId) {
        EventEntity eventEntity = eventRepository.findById(UUID.fromString(eventId)).orElseThrow(() -> new IllegalArgumentException("No Event Found"));
        return Converters.convertEvent(eventEntity);
    }

    public List<Event> getSchoolEvents(String schoolId) {
        List<EventEntity> events = eventRepository.findAllBySchoolId(UUID.fromString(schoolId));
        return events.stream().map(Converters::convertEvent).collect(Collectors.toList());
    }

    public Event createEvent(CreateEventInput createEventInput) {
        TeacherEntity teacherEntity = teacherRepository.getByAuthId((createEventInput.getTeacherId()));
        EventEntity event = Converters.buildEventEntity(createEventInput, teacherEntity);
        eventRepository.save(event);
        return Converters.convertEvent(event);
    }

    public Event joinEvent(String eventId, String studentId) {
        EventEntity eventEntity = eventRepository.findById(UUID.fromString(eventId)).orElseThrow();
        StudentEntity studentEntity = studentRepository.getByAuthId(studentId);
        StudentEventEntity studentEventEntity = Converters.buildEventUserEntity(eventEntity, studentEntity, StudentEventStatus.JOINED);
        studentEventRepository.save(studentEventEntity);
        return Converters.convertEvent(eventEntity);
    }

    public Event leaveEvent(String eventId, String studentId) {
        EventEntity eventEntity = eventRepository.findById(UUID.fromString(eventId)).orElseThrow(() -> new IllegalArgumentException("Event not found"));
        StudentEventEntity studentEventEntity = studentEventRepository.findByEventIdAndStudentId(UUID.fromString(eventId), UUID.fromString(studentId));
        studentEventRepository.delete(studentEventEntity);
        return Converters.convertEvent(eventEntity);
    }

    public Event acceptEventRequest(String eventId, String studentId) {
        EventEntity eventEntity = eventRepository.findById(UUID.fromString(eventId)).orElseThrow(() -> new IllegalArgumentException("Event not found"));
        StudentEntity studentEntity = studentRepository.findById(UUID.fromString(studentId)).orElseThrow(() -> new IllegalArgumentException("Student not found"));
        StudentEventEntity studentEventEntity = studentEventRepository.findByEventIdAndStudentId(UUID.fromString(eventId), UUID.fromString(studentId));
        studentEventEntity.setStatus(StudentEventStatus.ACCEPTED);
        studentEventRepository.save(studentEventEntity);
        calculateAndSetPoints(eventEntity, studentEntity);
        return Converters.convertEvent(eventEntity);
    }

    private void calculateAndSetPoints(EventEntity eventEntity, StudentEntity studentEntity) {
        if (eventEntity.getQuarter() == 1) {
            studentEntity.setQ1points(studentEntity.getQ1points() + eventEntity.getPoints());
        } else if (eventEntity.getQuarter() == 2) {
            studentEntity.setQ2points(studentEntity.getQ2points() + eventEntity.getPoints());
        } else if (eventEntity.getQuarter() == 3) {
            studentEntity.setQ3points(studentEntity.getQ3points() + eventEntity.getPoints());
        } else {
            studentEntity.setQ4points(studentEntity.getQ4points() + eventEntity.getPoints());
        }
        studentEntity.setPoints(studentEntity.getPoints() + eventEntity.getPoints());
    }
}
