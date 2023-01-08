package org.fblapbl.eventservice.util;

import org.fblapbl.eventservice.entities.*;
import org.fblapbl.eventservice.entities.StudentEventStatus;
import org.fblapbl.eventservice.graphql.types.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import java.util.stream.Collectors;

public class Converters {
    public static Student convertStudent(StudentEntity studentEntity, List<StudentEventEntity> eventUserEntities) {
        List<EventEntity> joined =
                eventUserEntities.stream()
                        .filter(record -> record.getStatus().equals(StudentEventStatus.JOINED))
                        .map(StudentEventEntity::getEvent)
                        .collect(Collectors.toList());

        List<EventEntity> accepted =
                eventUserEntities.stream()
                        .filter(record -> record.getStatus().equals(StudentEventStatus.ACCEPTED))
                        .map(StudentEventEntity::getEvent)
                        .collect(Collectors.toList());

        Student.Builder studentBuilder = Student.newBuilder()
                .id(studentEntity.getId().toString())
                .authId(studentEntity.getAuthId())
                .firstName(studentEntity.getFirstName())
                .lastName(studentEntity.getLastName())
                .email(studentEntity.getEmail())
                .points(studentEntity.getPoints())
                .q1points(studentEntity.getQ1points())
                .q2points(studentEntity.getQ2points())
                .q3points(studentEntity.getQ3points())
                .q4points(studentEntity.getQ4points())
                .grade(studentEntity.getGrade())
                .joinedEvents(joined.stream().map(Converters::convertEvent).collect(Collectors.toList()))
                .acceptedEvents(accepted.stream().map(Converters::convertEvent).collect(Collectors.toList()))
                .createdAt(studentEntity.getCreatedAt().toString())
                .updatedAt(studentEntity.getUpdatedAt().toString());
        return studentBuilder.build();
    }

    public static Student convertStudent(StudentEntity studentEntity) {
        Student.Builder studentBuilder = Student.newBuilder()
                .id(studentEntity.getId().toString())
                .authId(studentEntity.getAuthId())
                .firstName(studentEntity.getFirstName())
                .lastName(studentEntity.getLastName())
                .email(studentEntity.getEmail())
                .points(studentEntity.getPoints())
                .q1points(studentEntity.getQ1points())
                .q2points(studentEntity.getQ2points())
                .q3points(studentEntity.getQ3points())
                .q4points(studentEntity.getQ4points())
                .grade(studentEntity.getGrade())
                .createdAt(studentEntity.getCreatedAt().toString())
                .updatedAt(studentEntity.getUpdatedAt().toString());
        return studentBuilder.build();
    }

    public static Teacher convertTeacher(TeacherEntity teacherEntity) {
        Teacher.Builder userBuilder = Teacher.newBuilder()
                .id(teacherEntity.getId().toString())
                .authId(teacherEntity.getAuthId())
                .firstName(teacherEntity.getFirstName())
                .lastName(teacherEntity.getLastName())
                .email(teacherEntity.getEmail())
                .createdAt(teacherEntity.getCreatedAt().toString())
                .updatedAt(teacherEntity.getUpdatedAt().toString());
        return userBuilder.build();
    }

    public static Event convertEvent(EventEntity eventEntity) {
        List<StudentEntity> joined =
                eventEntity.getStudentEventEntities().stream()
                        .filter(record -> record.getStatus().equals(StudentEventStatus.JOINED))
                        .map(StudentEventEntity::getStudent)
                        .collect(Collectors.toList());

        List<StudentEntity> accepted =
                eventEntity.getStudentEventEntities().stream()
                        .filter(record -> record.getStatus().equals(StudentEventStatus.ACCEPTED))
                        .map(StudentEventEntity::getStudent)
                        .collect(Collectors.toList());

        Event.Builder eventBuilder = Event.newBuilder()
                .id(eventEntity.getId().toString())
                .teacher(Converters.convertTeacher(eventEntity.getTeacher()))
                .title(eventEntity.getTitle())
                .description(eventEntity.getDescription())
                .date(eventEntity.getDate().toString())
                .time(eventEntity.getTime())
                .points(eventEntity.getPoints())
                .date(eventEntity.getDate().toString())
                .quarter(eventEntity.getQuarter())
                .joinedStudents(joined.stream().map(Converters::convertStudent).collect(Collectors.toList()))
                .acceptedStudents(accepted.stream().map(Converters::convertStudent).collect(Collectors.toList()))
                .createdAt(eventEntity.getCreatedAt().toString())
                .updatedAt(eventEntity.getUpdatedAt().toString());
        return eventBuilder.build();
    }

    public static School convertSchool(SchoolEntity schoolEntity) {
        School.Builder schoolBuilder = School.newBuilder()
                .id(schoolEntity.getId().toString())
                .name(schoolEntity.getName())
                .code(schoolEntity.getCode())
                .createdAt(schoolEntity.getCreatedAt().toString())
                .updatedAt(schoolEntity.getUpdatedAt().toString());
        return schoolBuilder.build();

    }

    public static SchoolEntity buildSchoolEntity(CreateAccountInput createAccountInput) {
        SchoolEntity school = new SchoolEntity();
        school.setName(createAccountInput.getSchoolName());
        return school;
    }

    public static StudentEntity buildStudentEntity(CreateStudentInput createStudentInput, SchoolEntity schoolEntity, String authId) {
        StudentEntity student = new StudentEntity();
        student.setSchool(schoolEntity);
        student.setAuthId(authId);
        student.setFirstName(createStudentInput.getFirstName());
        student.setLastName(createStudentInput.getLastName());
        student.setEmail(createStudentInput.getEmail());
        student.setPoints(0);
        student.setQ1points(0);
        student.setQ2points(0);
        student.setQ3points(0);
        student.setQ4points(0);
        return student;
    }

    public static TeacherEntity buildTeacherEntity(CreateAccountInput createAccountInput, SchoolEntity schoolEntity, String authId) {
        TeacherEntity teacher = new TeacherEntity();
        teacher.setSchool(schoolEntity);
        teacher.setAuthId(authId);
        teacher.setFirstName(createAccountInput.getFirstName());
        teacher.setLastName(createAccountInput.getLastName());
        teacher.setEmail(createAccountInput.getEmail());
        return teacher;
    }

    public static EventEntity buildEventEntity(CreateEventInput createEventInput, TeacherEntity teacherEntity) {
        EventEntity event = new EventEntity();
        event.setTeacher(teacherEntity);
        event.setTitle(createEventInput.getTitle());
        event.setDescription(createEventInput.getDescription());
        event.setPoints(createEventInput.getPoints());
        event.setDate(toDate(createEventInput.getDate()));
        event.setTime(createEventInput.getTime());
        event.setQuarter(createEventInput.getQuarter());
        return event;
    }

    public static StudentEventEntity buildEventUserEntity(EventEntity eventEntity, StudentEntity studentEntity, StudentEventStatus status) {
        StudentEventEntity studentEventEntity = new StudentEventEntity();
        studentEventEntity.setEvent(eventEntity);
        studentEventEntity.setStudent(studentEntity);
        studentEventEntity.setStatus(status);
        return studentEventEntity;
    }

    public static String getToken(String bearerToken) {
        try {
            return bearerToken.split("Bearer ")[1];
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid Bearer Token Format");
        }
    }

    public static Date toDate(String dateInput) {
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
