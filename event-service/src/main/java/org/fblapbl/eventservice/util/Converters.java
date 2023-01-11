package org.fblapbl.eventservice.util;

import org.fblapbl.eventservice.entities.*;
import org.fblapbl.eventservice.graphql.types.ParticipationStatus;
import org.fblapbl.eventservice.graphql.types.*;
import org.fblapbl.eventservice.repositories.EventRepository;
import org.fblapbl.eventservice.repositories.ParticipationRepository;
import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

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
        teacher.setUpdatedAt(teacherEntity.getUpdatedAt().toString());
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
        student.setPoints(studentEntity.getPoints());
        student.setQ1points(studentEntity.getQ1points());
        student.setQ2points(studentEntity.getQ2points());
        student.setQ3points(studentEntity.getQ3points());
        student.setQ4points(studentEntity.getQ4points());
        student.setCreatedAt(studentEntity.getCreatedAt().toString());
        student.setUpdatedAt(studentEntity.getUpdatedAt().toString());
        return student;
    }

    public School toGraphQLType(SchoolEntity schoolEntity) {
        School school = new School();
        school.setId(schoolEntity.getId().toString());
        school.setName(schoolEntity.getName());
        school.setCode(schoolEntity.getCode());
        school.setCreatedAt(schoolEntity.getCreatedAt().toString());
        school.setUpdatedAt(schoolEntity.getUpdatedAt().toString());
        return school;
    }

    public Participation toGraphQLType(ParticipationEntity participationEntity) {
        Participation participation = new Participation();
        participation.setId(participationEntity.getId().toString());
        participation.setStudent(toGraphQLType(participationEntity.getStudent()));
        participation.setEvent(toGraphQLType(participationEntity.getEvent()));
        participation.setStatus(ParticipationStatus.valueOf(participationEntity.getStatus().name()));
        participation.setCreatedAt(participationEntity.getCreatedAt().toString());
        participation.setUpdatedAt(participationEntity.getUpdatedAt().toString());
        return participation;
    }

    public Event toGraphQLType(EventEntity eventEntity) {
        Event event = new Event();
        event.setId(eventEntity.getId().toString());
        event.setTeacher(toGraphQLType(eventEntity.getTeacher()));
        event.setSchool(toGraphQLType(eventEntity.getSchool()));
        event.setTitle(eventEntity.getTitle());
        event.setDescription(eventEntity.getDescription());
        event.setPoints(eventEntity.getPoints());
        event.setTime(eventEntity.getTime());
        event.setDate(eventEntity.getDate().toString());
        event.setQuarter(eventEntity.getQuarter());
        event.setCreatedAt(eventEntity.getCreatedAt().toString());
        event.setUpdatedAt(eventEntity.getUpdatedAt().toString());
        return event;
    }

    public Prize toGraphQLType(PrizeEntity prizeEntity) {
        Prize prize = new Prize();
        prize.setId(prizeEntity.getId().toString());
        prize.setName(prizeEntity.getName());
        prize.setDescription(prizeEntity.getDescription());
        prize.setPointsRequired(prizeEntity.getPointsRequired());
        prize.setSchool(toGraphQLType(prizeEntity.getSchool()));
        prize.setCreatedAt(prizeEntity.getCreatedAt().toString());
        return prize;
    }

    public SchoolEntity toEntity(CreateSchoolInput input) {
        SchoolEntity school = new SchoolEntity();
        school.setName(input.getSchoolName());
        return school;
    }

    public TeacherEntity toEntity(CreateTeacherInput input, SchoolEntity schoolEntity) {
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
        student.setGrade(input.getGrade());
        return student;
    }

    public EventEntity toEntity(CreateEventInput input, SchoolEntity schoolEntity, TeacherEntity teacherEntity) {
        EventEntity event = new EventEntity();
        event.setSchool(schoolEntity);
        event.setTeacher(teacherEntity);
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
        participation.setEvent(eventEntity);
        participation.setStudent(studentEntity);
        participation.setStatus(status);
        return participation;
    }

    public PrizeEntity toEntity(CreatePrizeInput createPrizeInput, SchoolEntity schoolEntity) {
        PrizeEntity prizeEntity = new PrizeEntity();
        prizeEntity.setSchool(schoolEntity);
        prizeEntity.setName(createPrizeInput.getName());
        prizeEntity.setDescription(createPrizeInput.getDescription());
        prizeEntity.setPointsRequired(createPrizeInput.getPointsRequired());
        return prizeEntity;
    }

    public StudentPrizeEntity toEntity(StudentEntity studentEntity, PrizeEntity prizeEntity) {
        StudentPrizeEntity studentPrizeEntity = new StudentPrizeEntity();
        studentPrizeEntity.setStudent(studentEntity);
        studentPrizeEntity.setPrize(prizeEntity);
        return studentPrizeEntity;
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
