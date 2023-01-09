package org.fblapbl.eventservice.util;

import org.fblapbl.eventservice.entities.*;
import org.fblapbl.eventservice.graphql.types.*;
import org.fblapbl.eventservice.graphql.types.ParticipationStatus;
import org.fblapbl.eventservice.repositories.EventRepository;
import org.fblapbl.eventservice.repositories.ParticipationRepository;
import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import java.util.stream.Collectors;

@Component
public class Converters {
    private final ParticipationRepository participationRepository;
    private final EventRepository eventRepository;

    public Converters(ParticipationRepository participationRepository, EventRepository eventRepository) {
        this.participationRepository = participationRepository;
        this.eventRepository = eventRepository;
    }

    public Teacher toGraphQLType(TeacherEntity teacherEntity) {
        Teacher teacher = new Teacher();
        teacher.setId(teacherEntity.getId().toString());
        teacher.setSchool(toGraphQLType(teacherEntity.getSchool()));
        teacher.setFirstName(teacherEntity.getFirstName());
        teacher.setLastName(teacherEntity.getLastName());
        teacher.setEmail(teacherEntity.getEmail());
        teacher.setCreatedAt(teacherEntity.getCreatedAt().toString());
//      teacher.setUpdatedAt(teacherEntity.getUpdatedAt().toString());
        return teacher;
    }

    public Student toGraphQLType(StudentEntity studentEntity) {
        Student student = new Student();
        student.setId(studentEntity.getId().toString());
        student.setSchool(toGraphQLType(studentEntity.getSchool()));
        student.setFirstName(studentEntity.getFirstName());
        student.setLastName(studentEntity.getLastName());
        student.setEmail(studentEntity.getEmail());
        student.setGrade(studentEntity.getGrade());
        List<ParticipationEntity> participationEntities = participationRepository.findAllByEventId(studentEntity.getId());
        student.setParticipations(participationEntities.stream().map(this::toGraphQLType).collect(Collectors.toList()));
        student.setPoints(studentEntity.getPoints());
        student.setQ1points(studentEntity.getQ1points());
        student.setQ2points(studentEntity.getQ2points());
        student.setQ3points(studentEntity.getQ3points());
        student.setQ4points(studentEntity.getQ4points());
        student.setCreatedAt(studentEntity.getCreatedAt().toString());
//      student.setUpdatedAt(studentEntity.getUpdatedAt().toString());
        return student;
    }

    public School toGraphQLType(SchoolEntity schoolEntity) {
        School school = new School();
        school.setId(schoolEntity.getId().toString());
        school.setName(schoolEntity.getName());
        school.setCode(schoolEntity.getCode());
        school.setCreatedAt(schoolEntity.getCreatedAt().toString());
//      school.setUpdatedAt(schoolEntity.getUpdatedAt().toString());
        return school;
    }

    public Participation toGraphQLType(ParticipationEntity participationEntity) {
        Participation participation = new Participation();
        participation.setId(participationEntity.getId().toString());
        participation.setStudentId(participationEntity.getStudentId().toString());
        participation.setEventId(participationEntity.getEventId().toString());
        participation.setStatus(ParticipationStatus.valueOf(participationEntity.getStatus().name()));
        return participation;
    }

    public Event toGraphQLType(EventEntity eventEntity) {
        Event event = new Event();
        event.setId(eventEntity.getId().toString());
        event.setSchool(toGraphQLType(eventEntity.getSchool()));
        event.setTitle(eventEntity.getTitle());
        event.setDescription(eventEntity.getDescription());
        event.setPoints(eventEntity.getPoints());
        event.setTime(eventEntity.getTime());
        event.setDate(eventEntity.getDate().toString());
        event.setQuarter(eventEntity.getQuarter());
        List<ParticipationEntity> participationEntities = participationRepository.findAllByEventId(eventEntity.getId());
        event.setParticipations(participationEntities.stream().map(this::toGraphQLType).collect(Collectors.toList()));
        return event;
    }

    public SchoolEntity toEntity(CreateAccountInput input) {
        SchoolEntity school = new SchoolEntity();
        school.setName(input.getSchoolName());
        return school;
    }

    public TeacherEntity toEntity(CreateAccountInput input, SchoolEntity schoolEntity) {
        TeacherEntity teacher = new TeacherEntity();
        teacher.setSchool(schoolEntity);
        teacher.setFirstName(input.getFirstName());
        teacher.setLastName(input.getLastName());
        teacher.setEmail(input.getEmail());
        return teacher;
    }

    public StudentEntity toEntity(CreateStudentInput input, SchoolEntity schoolEntity) {
        StudentEntity student = new StudentEntity();
        student.setSchool(schoolEntity);
        student.setFirstName(input.getFirstName());
        student.setLastName(input.getLastName());
        student.setEmail(input.getEmail());
        return student;
    }

    public EventEntity toEntity(CreateEventInput input, SchoolEntity schoolEntity) {
        EventEntity event = new EventEntity();
        event.setSchool(schoolEntity);
        event.setTitle(input.getTitle());
        event.setDescription(input.getDescription());
        event.setDate(toDate(input.getDate()));
        event.setTime(input.getTime());
        event.setPoints(input.getPoints());
        event.setQuarter(input.getQuarter());
        return event;
    }

    public ParticipationEntity toEntity(EventEntity eventEntity, StudentEntity studentEntity, org.fblapbl.eventservice.entities.ParticipationStatus status) {
        ParticipationEntity participation = new ParticipationEntity();
        participation.setEventId(eventEntity.getId());
        participation.setStudentId(studentEntity.getId());
        participation.setStatus(status);
        return participation;
    }

    public Date toDate(String dateInput) {
        try {
            TimeZone tz = TimeZone.getTimeZone("UTC");
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            df.setTimeZone(tz);
            return df.parse(dateInput);
        } catch (ParseException e) {
            throw new IllegalArgumentException(e.toString());
        }
    }
}
