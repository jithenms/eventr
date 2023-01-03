package com.example.events.eventapp.graphql;

import com.example.events.eventapp.converters.Converters;
import com.example.events.eventapp.entities.StudentEntity;
import com.example.events.eventapp.entities.TeacherEntity;
import com.example.events.eventapp.generated.types.LeaderboardInput;
import com.example.events.eventapp.generated.types.RegisterUserInput;
import com.example.events.eventapp.generated.types.User;
import com.example.events.eventapp.repositories.StudentRepository;
import com.example.events.eventapp.repositories.TeacherRepository;
import com.example.events.eventapp.services.AuthService;
import com.google.firebase.auth.UserRecord;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@DgsComponent
public class UserDataFetcher {

    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final AuthService authService;

    public UserDataFetcher(TeacherRepository teacherRepository, StudentRepository studentRepository, AuthService authService) {
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.authService = authService;
    }

    @DgsMutation
    public User registerUser(@InputArgument RegisterUserInput registerUserInput) {
        UserRecord newUser = authService.createUser(registerUserInput);
        switch (registerUserInput.getRole()) {
            case TEACHER -> {
                TeacherEntity user = Converters.buildTeacherEntity(registerUserInput, newUser.getUid());
                teacherRepository.save(user);
                return Converters.convertTeacher(user);
            }
            case STUDENT -> {
                StudentEntity user = Converters.buildStudentEntity(registerUserInput, newUser.getUid());
                studentRepository.save(user);
                return Converters.convertStudent(user);
            }
            default -> {
                throw new IllegalArgumentException("Invalid Role");
            }
        }

    }

    @DgsMutation
    public String deleteStudent(@InputArgument String userId) {
        studentRepository.deleteById(UUID.fromString(userId));
        return "DELETED STUDENT";
    }

    @DgsMutation
    public String deleteTeacher(@InputArgument String userId) {
        teacherRepository.deleteById(UUID.fromString(userId));
        return "DELETED TEACHER";
    }

//    @DgsMutation
//    @Transactional
//    public User addPoints(@InputArgument AddPointsInput addPointsInput) {
//        StudentEntity studentEntity = studentRepository.findById(UUID.fromString(addPointsInput.getStudentId())).orElseThrow(() -> new IllegalArgumentException("Student not found"));
//        studentEntity.setPoints(studentEntity.getPoints() + addPointsInput.getPoints());
//        return Converters.convertStudent(studentEntity);
//    }

    @DgsQuery
    public List<User> getStudents() {
        List<StudentEntity> students = studentRepository.findAll();
        return students.stream().map(Converters::convertStudent).collect(Collectors.toList());
    }

    @DgsQuery
    public User getStudent(@InputArgument String authId) {
        StudentEntity studentEntity = studentRepository.getByAuthId(authId);
        return Converters.convertStudent(studentEntity);
    }

    @DgsQuery
    public List<User> getTeachers() {
        List<TeacherEntity> teachers = teacherRepository.findAll();
        return teachers.stream().map(Converters::convertTeacher).collect(Collectors.toList());
    }

    @DgsQuery
    public User getTeacher(@InputArgument String authId) {
        TeacherEntity teacherEntity = teacherRepository.getByAuthId(authId);
        return Converters.convertTeacher(teacherEntity);
    }

    @DgsQuery
    public List<User> getLeaderboard(@InputArgument LeaderboardInput leaderboardInput) {
        List<StudentEntity> students;
        if (leaderboardInput.getQuarter() == 0) {
            students = studentRepository.findAll(Sort.by(Sort.Direction.DESC, "points"));
        } else {
            students = studentRepository.findAll(Sort.by(Sort.Direction.DESC, "q" + leaderboardInput.getQuarter() + "points"));
        }
        return students.stream().map(Converters::convertStudent).collect(Collectors.toList());
    }

//    @DgsQuery
//    public List<User> getLeaderboardByEvents() {
//        List<StudentEntity> students = studentRepository.findAll(Sort.by(Sort.Direction.DESC, "events"));
//        return students.stream().map(Converters::convertStudent).collect(Collectors.toList());
//    }

}
