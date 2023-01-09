package org.fblapbl.eventservice.services;

import org.fblapbl.eventservice.entities.*;
import org.fblapbl.eventservice.graphql.types.CreateEventInput;
import org.fblapbl.eventservice.graphql.types.Event;
import org.fblapbl.eventservice.repositories.*;
import org.fblapbl.eventservice.util.Converters;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EventService {
    private final Converters converters;
    private final SchoolRepository schoolRepository;
    private final StudentRepository studentRepository;
    private final EventRepository eventRepository;
    private final ParticipationRepository participationRepository;
    private final TeacherRepository teacherRepository;


    public EventService(TeacherRepository teacherRepository, Converters converters, SchoolRepository schoolRepository, StudentRepository studentRepository, EventRepository eventRepository, ParticipationRepository participationRepository) {
        this.converters = converters;
        this.teacherRepository = teacherRepository;
        this.schoolRepository = schoolRepository;
        this.studentRepository = studentRepository;
        this.eventRepository = eventRepository;
        this.participationRepository = participationRepository;
    }

    public Event getEvent(String eventId) {
        EventEntity eventEntity = eventRepository.findById(UUID.fromString(eventId)).orElseThrow(() -> new IllegalArgumentException("No Event Found"));
        return converters.toGraphQLType(eventEntity);
    }

    public List<Event> getTeacherEvents(String teacherId) {
        List<EventEntity> events = eventRepository.findAllByTeacherId(UUID.fromString(teacherId));
        return events.stream().map(converters::toGraphQLType).collect(Collectors.toList());
    }

    public List<Event> getSchoolEvents(String schoolId) {
        List<EventEntity> events = eventRepository.findAllBySchoolId(UUID.fromString(schoolId));
        return events.stream().map(converters::toGraphQLType).collect(Collectors.toList());
    }

    public Event createEvent(CreateEventInput createEventInput) {
        SchoolEntity schoolEntity = schoolRepository.findById(UUID.fromString(createEventInput.getSchoolId())).orElseThrow();
        TeacherEntity teacherEntity = teacherRepository.findById(UUID.fromString(createEventInput.getTeacherId())).orElseThrow();
        EventEntity event = converters.toEntity(createEventInput, schoolEntity, teacherEntity);
        eventRepository.save(event);
        return converters.toGraphQLType(event);
    }

    public Event joinEvent(String eventId, String studentId) {
        EventEntity eventEntity = eventRepository.findById(UUID.fromString(eventId)).orElseThrow();
        StudentEntity studentEntity = studentRepository.findById(UUID.fromString(studentId)).orElseThrow();
        ParticipationEntity participationEntity = converters.toEntity(eventEntity, studentEntity, ParticipationStatus.JOINED);
        participationRepository.save(participationEntity);
        return converters.toGraphQLType(eventEntity);
    }

    public Event leaveEvent(String eventId, String studentId) {
        EventEntity eventEntity = eventRepository.findById(UUID.fromString(eventId)).orElseThrow(() -> new IllegalArgumentException("Event not found"));
        ParticipationEntity participationEntity = participationRepository.findByEventIdAndStudentId(UUID.fromString(eventId), UUID.fromString(studentId));
        participationRepository.delete(participationEntity);
        return converters.toGraphQLType(eventEntity);
    }

    public Event acceptEventRequest(String eventId, String studentId) {
        EventEntity eventEntity = eventRepository.findById(UUID.fromString(eventId)).orElseThrow(() -> new IllegalArgumentException("Event not found"));
        StudentEntity studentEntity = studentRepository.findById(UUID.fromString(studentId)).orElseThrow(() -> new IllegalArgumentException("Student not found"));
        ParticipationEntity participationEntity = participationRepository.findByEventIdAndStudentId(UUID.fromString(eventId), UUID.fromString(studentId));
        participationEntity.setStatus(ParticipationStatus.ACCEPTED);
        participationRepository.save(participationEntity);
        calculateAndSetPoints(eventEntity, studentEntity);
        return converters.toGraphQLType(eventEntity);
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
