package com.example.events.eventapp.converters;

import com.example.events.eventapp.entities.EventEntity;
import com.example.events.eventapp.entities.StudentEntity;
import com.example.events.eventapp.entities.TeacherEntity;
import com.example.events.eventapp.generated.types.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

public class Converters {
    public static User convertStudent(StudentEntity studentEntity) {
        User.Builder userBuilder = User.newBuilder()
                .id(studentEntity.getId().toString())
                .authId(studentEntity.getAuthId())
                .firstName(studentEntity.getFirstName())
                .lastName(studentEntity.getLastName())
                .email(studentEntity.getEmail())
                .role(UserRole.STUDENT)
                .points(studentEntity.getPoints())
                .q1points(studentEntity.getQ1points())
                .q2points(studentEntity.getQ2points())
                .q3points(studentEntity.getQ3points())
                .q4points(studentEntity.getQ4points())
                .grade(studentEntity.getGrade())
                .joinedEvents(studentEntity.getEvents().stream().filter(Objects::nonNull).map(Converters::convertEvent).collect(Collectors.toList()))
                .requestedEvents(studentEntity.getRequests().stream().filter(Objects::nonNull).map(Converters::convertEvent).collect(Collectors.toList()))
                .createdAt(studentEntity.getCreatedAt().toString());

        return userBuilder.build();
    }

    public static User convertTeacher(TeacherEntity teacherEntity) {
        User.Builder userBuilder = User.newBuilder()
                .id(teacherEntity.getId().toString())
                .authId(teacherEntity.getAuthId())
                .firstName(teacherEntity.getFirstName())
                .lastName(teacherEntity.getLastName())
                .email(teacherEntity.getEmail())
                .role(UserRole.TEACHER)
                .createdAt(teacherEntity.getCreatedAt().toString());
        return userBuilder.build();
    }

    public static Event convertEvent(EventEntity eventEntity) {
        Event.Builder eventBuilder = Event.newBuilder()
                .id(eventEntity.getId().toString())
                .title(eventEntity.getTitle())
                .description(eventEntity.getDescription())
                .date(eventEntity.getDate().toString())
                .time(eventEntity.getTime())
                .points(eventEntity.getPoints())
                .date(eventEntity.getDate().toString())
                .quarter(eventEntity.getQuarter())
                .studentListLength(eventEntity.getStudents().toArray().length + eventEntity.getStudentRequests().toArray().length)
                .studentIdList(eventEntity.getStudents().stream().map(Converters::convertStudentNoList).collect(Collectors.toList()))
                .studentIdRequests(eventEntity.getStudentRequests().stream().map(Converters::convertStudentNoList).collect(Collectors.toList()))
                .teacherId((eventEntity.getTeacher().getId()).toString())
                .teacher(Converters.convertTeacher(eventEntity.getTeacher()))
                .createdAt(eventEntity.getCreatedAt().toString());

        return eventBuilder.build();
    }

    public static StudentEntity buildStudentEntity(RegisterUserInput registerUserInput, String authId) {
        StudentEntity user = new StudentEntity();
        user.setAuthId(authId);
        user.setFirstName(registerUserInput.getFirstName());
        user.setLastName(registerUserInput.getLastName());
        user.setEmail(registerUserInput.getEmail());
        user.setGrade(registerUserInput.getGrade());
        user.setPoints(0);
        user.setQ1points(0);
        user.setQ2points(0);
        user.setQ3points(0);
        user.setQ4points(0);
        return user;
    }

    public static TeacherEntity buildTeacherEntity(RegisterUserInput registerUserInput, String authId) {
        TeacherEntity user = new TeacherEntity();
        user.setAuthId(authId);
        user.setFirstName(registerUserInput.getFirstName());
        user.setLastName(registerUserInput.getLastName());
        user.setEmail(registerUserInput.getEmail());
        return user;
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

    public static String getStudentId(StudentEntity studentEntity) {
        return studentEntity.getId().toString();
    }

    private static Date toDate(String dateInput) {
        try {
            TimeZone tz = TimeZone.getTimeZone("UTC");
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            df.setTimeZone(tz);
            return df.parse(dateInput);
        } catch (ParseException e) {
            throw new IllegalArgumentException(e.toString());
        }
    }

    public static User convertStudentNoList(StudentEntity studentEntity) {
        User.Builder userBuilder = User.newBuilder()
                .id(studentEntity.getId().toString())
                .authId(studentEntity.getAuthId())
                .firstName(studentEntity.getFirstName())
                .lastName(studentEntity.getLastName())
                .email(studentEntity.getEmail())
                .role(UserRole.STUDENT)
                .points(0)
                .q1points(studentEntity.getQ1points())
                .q2points(studentEntity.getQ2points())
                .q3points(studentEntity.getQ3points())
                .q4points(studentEntity.getQ4points())
                .grade(studentEntity.getGrade())
                .createdAt(studentEntity.getCreatedAt().toString());

        return userBuilder.build();
    }
}
