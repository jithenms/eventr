package com.example.events.eventapp.graphql;

import com.example.events.eventapp.converters.Converters;
import com.example.events.eventapp.entities.EventEntity;
import com.example.events.eventapp.entities.StudentEntity;
import com.example.events.eventapp.entities.TeacherEntity;
import com.example.events.eventapp.generated.types.*;
import com.example.events.eventapp.repositories.EventRepository;
import com.example.events.eventapp.repositories.StudentRepository;
import com.example.events.eventapp.repositories.TeacherRepository;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@DgsComponent
public class EventDataFetcher {
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final EventRepository eventRepository;

    public EventDataFetcher(TeacherRepository teacherRepository, StudentRepository studentRepository, EventRepository eventRepository) {
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.eventRepository = eventRepository;
    }

    @DgsMutation
    public Event createEvent(@InputArgument CreateEventInput createEventInput) {
        TeacherEntity teacherEntity = teacherRepository.getByAuthId((createEventInput.getTeacherId()));
        EventEntity event = Converters.buildEventEntity(createEventInput, teacherEntity);
        eventRepository.save(event);
        return Converters.convertEvent(event);
    }

    @DgsQuery
    public List<Event> getEvents() {
        List<EventEntity> events = eventRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        return events.stream().map(Converters::convertEvent).collect(Collectors.toList());
    }

    @DgsQuery
    public Event getEvent(@InputArgument String eventId) {
        EventEntity eventEntity = eventRepository.findById(UUID.fromString(eventId)).orElseThrow(() -> new IllegalArgumentException("Event not found"));
        return Converters.convertEvent(eventEntity);
    }

//    takes in authid as input argument
    @DgsQuery
    public List<Event> getEventsByTeacher(@InputArgument String id) {
        UUID teacherId = teacherRepository.getByAuthId(id).getId(); // gets teacher by passed in auth id, then finds it's id
        List<EventEntity> events = eventRepository.getAllByTeacherId(teacherId);
        return events.stream().map(Converters::convertEvent).collect(Collectors.toList());
    }

    @DgsMutation
    @Transactional
    public Event joinEvent(@InputArgument JoinEventInput joinEventInput) {
        EventEntity eventEntity = eventRepository.findById(UUID.fromString(joinEventInput.getEventId())).orElseThrow();
        StudentEntity studentEntity = studentRepository.getByAuthId(joinEventInput.getStudentId());
        studentEntity.getRequests().add(eventEntity);
        return Converters.convertEvent(eventEntity);
    }

    @DgsMutation
    @Transactional
    public Event leaveEvent(@InputArgument LeaveEventInput leaveEventInput) {
        EventEntity eventEntity = eventRepository.findById(UUID.fromString(leaveEventInput.getEventId())).orElseThrow(() -> new IllegalArgumentException("Event not found"));
        StudentEntity studentEntity = studentRepository.getByAuthId(leaveEventInput.getStudentId());
        studentEntity.getRequests().remove(eventEntity);
        return Converters.convertEvent(eventEntity);
    }

    @DgsMutation
    public String deleteEvent(@InputArgument String eventId) {
        eventRepository.deleteById(UUID.fromString(eventId));
        return "DELETED EVENT";
    }

    @DgsMutation
    @Transactional
    public Event denyStudentRequest(@InputArgument DenyStudentRequestInput denyStudentRequestInput) {
        EventEntity eventEntity = eventRepository.findById(UUID.fromString(denyStudentRequestInput.getEventId())).orElseThrow(() -> new IllegalArgumentException("Event not found"));
        StudentEntity studentEntity = studentRepository.findById(UUID.fromString(denyStudentRequestInput.getStudentId())).orElseThrow(() -> new IllegalArgumentException("Student not found"));
        studentEntity.getRequests().remove(eventEntity);
        eventEntity.getStudentRequests().remove(studentEntity);
        return Converters.convertEvent(eventEntity);
    }

    @DgsMutation
    @Transactional
    public Event acceptStudentRequest(@InputArgument AcceptStudentRequestInput acceptStudentRequestInput) {
        EventEntity eventEntity = eventRepository.findById(UUID.fromString(acceptStudentRequestInput.getEventId())).orElseThrow(() -> new IllegalArgumentException("Event not found"));
        StudentEntity studentEntity = studentRepository.findById(UUID.fromString(acceptStudentRequestInput.getStudentId())).orElseThrow(() -> new IllegalArgumentException("Student not found"));
        studentEntity.getRequests().remove(eventEntity);
        studentEntity.getEvents().add(eventEntity);

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
        return Converters.convertEvent(eventEntity);
    }

    @DgsMutation
    public String deleteAllEvents() {
        eventRepository.deleteAll();
        return "DELETED ALL EVENTS";
    }
}
