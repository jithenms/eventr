package org.fblapbl.eventservice.services;

import com.google.firebase.auth.UserRecord;
import org.fblapbl.eventservice.entities.SchoolEntity;
import org.fblapbl.eventservice.entities.StudentEntity;
import org.fblapbl.eventservice.entities.StudentEventEntity;
import org.fblapbl.eventservice.entities.TeacherEntity;
import org.fblapbl.eventservice.graphql.types.*;
import org.fblapbl.eventservice.repositories.SchoolRepository;
import org.fblapbl.eventservice.repositories.StudentEventRepository;
import org.fblapbl.eventservice.repositories.StudentRepository;
import org.fblapbl.eventservice.repositories.TeacherRepository;
import org.fblapbl.eventservice.util.Converters;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class UserService {
    private final SchoolRepository schoolRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final StudentEventRepository studentEventRepository;
    private final AuthService authService;

    public UserService(SchoolRepository schoolRepository, TeacherRepository teacherRepository, StudentRepository studentRepository, StudentEventRepository studentEventRepository, AuthService authService) {
        this.schoolRepository = schoolRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.studentEventRepository = studentEventRepository;
        this.authService = authService;
    }

    public Student getStudent(String authId) {
        StudentEntity studentEntity = studentRepository.getByAuthId(authId);
        List<StudentEventEntity> studentEventEntities = studentEventRepository.findAllByStudentId(studentEntity.getId());
        return Converters.convertStudent(studentEntity, studentEventEntities);
    }

    public Teacher getTeacher(String authId) {
        TeacherEntity teacherEntity = teacherRepository.getByAuthId(authId);
        return Converters.convertTeacher(teacherEntity);
    }

    public List<Student> getLeaderboard(String schoolId, Integer quarter) {
        List<StudentEntity> students;
        if (quarter == 0) {
            students = studentRepository.findAllBySchoolId(UUID.fromString(schoolId), Sort.by(Sort.Direction.DESC, "points"));
        } else {
            students = studentRepository.findAllBySchoolId(UUID.fromString(schoolId), Sort.by(Sort.Direction.DESC, "q" + quarter + "points"));
        }
        List<Student> studentsResponse = new ArrayList<>();
        for (StudentEntity student : students) {
            List<StudentEventEntity> studentEventEntities = studentEventRepository.findAllByStudentId(student.getId());
            studentsResponse.add(Converters.convertStudent(student, studentEventEntities));
        }
        return studentsResponse;
    }

    public School createAccount(CreateAccountInput createAccountInput) {
        SchoolEntity schoolEntity = Converters.buildSchoolEntity(createAccountInput);
        schoolRepository.save(schoolEntity);
        UserRecord newUser = authService.createAccount(createAccountInput.getEmail(), createAccountInput.getPassword(), schoolEntity.getId());
        TeacherEntity teacher = Converters.buildTeacherEntity(createAccountInput, schoolEntity, newUser.getUid());
        teacherRepository.save(teacher);
        return Converters.convertSchool(schoolEntity);
    }


    public Student createStudent(CreateStudentInput createStudentInput) {
        SchoolEntity schoolEntity = schoolRepository.findByCode(createStudentInput.getSchoolCode());
        UserRecord newUser = authService.createAccount(createStudentInput.getEmail(), createStudentInput.getPassword(), schoolEntity.getId());
        StudentEntity studentEntity = Converters.buildStudentEntity(createStudentInput, schoolEntity, newUser.getUid());
        studentRepository.save(studentEntity);
        return Converters.convertStudent(studentEntity);
    }
}
