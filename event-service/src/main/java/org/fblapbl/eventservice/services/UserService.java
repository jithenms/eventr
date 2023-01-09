package org.fblapbl.eventservice.services;

import com.google.firebase.auth.UserRecord;
import org.fblapbl.eventservice.entities.SchoolEntity;
import org.fblapbl.eventservice.entities.StudentEntity;
import org.fblapbl.eventservice.entities.TeacherEntity;
import org.fblapbl.eventservice.graphql.types.*;
import org.fblapbl.eventservice.repositories.SchoolRepository;
import org.fblapbl.eventservice.repositories.ParticipationRepository;
import org.fblapbl.eventservice.repositories.StudentRepository;
import org.fblapbl.eventservice.repositories.TeacherRepository;
import org.fblapbl.eventservice.util.Converters;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final Converters converters;
    private final SchoolRepository schoolRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final AuthService authService;

    public UserService(Converters converters, SchoolRepository schoolRepository, TeacherRepository teacherRepository, StudentRepository studentRepository, ParticipationRepository participationRepository, AuthService authService) {
        this.converters = converters;
        this.schoolRepository = schoolRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.authService = authService;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll().stream().map(converters::toGraphQLType).collect(Collectors.toList());
    }

    public List<School> getAllSchools() {
        return schoolRepository.findAll().stream().map(converters::toGraphQLType).collect(Collectors.toList());
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll().stream().map(converters::toGraphQLType).collect(Collectors.toList());
    }

    public Student getStudent(String studentId) {
        StudentEntity studentEntity = studentRepository.findById(UUID.fromString(studentId)).orElseThrow();
        return converters.toGraphQLType(studentEntity);
    }

    public Teacher getTeacher(String teacherId) {
        TeacherEntity teacherEntity = teacherRepository.findById(UUID.fromString(teacherId)).orElseThrow();
        return converters.toGraphQLType(teacherEntity);
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
            studentsResponse.add(converters.toGraphQLType(student));
        }
        return studentsResponse;
    }

    public School createSchool(CreateSchoolInput createSchoolInput) {
        SchoolEntity schoolEntity = converters.toEntity(createSchoolInput);
        schoolRepository.save(schoolEntity);
        return converters.toGraphQLType(schoolEntity);
    }

    public Teacher createTeacher(CreateTeacherInput createTeacherInput) {
        SchoolEntity schoolEntity = schoolRepository.findByCode(createTeacherInput.getSchoolCode());
        TeacherEntity teacherEntity = converters.toEntity(createTeacherInput, schoolEntity);
        teacherRepository.save(teacherEntity);
        authService.createAccount(teacherEntity.getId(), createTeacherInput.getEmail(), createTeacherInput.getPassword(), UserRole.TEACHER);
        return converters.toGraphQLType(teacherEntity);
    }


    public Student createStudent(CreateStudentInput createStudentInput) {
        SchoolEntity schoolEntity = schoolRepository.findByCode(createStudentInput.getSchoolCode());
        StudentEntity studentEntity = converters.toEntity(createStudentInput, schoolEntity);
        studentRepository.save(studentEntity);
        authService.createAccount(studentEntity.getId(), createStudentInput.getEmail(), createStudentInput.getPassword(), UserRole.STUDENT);
        return converters.toGraphQLType(studentEntity);
    }
}
