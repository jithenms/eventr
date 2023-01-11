package org.fblapbl.eventservice.services;

import org.fblapbl.eventservice.entities.PrizeEntity;
import org.fblapbl.eventservice.entities.SchoolEntity;
import org.fblapbl.eventservice.entities.StudentEntity;
import org.fblapbl.eventservice.entities.StudentPrizeEntity;
import org.fblapbl.eventservice.graphql.types.CreatePrizeInput;
import org.fblapbl.eventservice.graphql.types.Prize;
import org.fblapbl.eventservice.repositories.PrizeRepository;
import org.fblapbl.eventservice.repositories.SchoolRepository;
import org.fblapbl.eventservice.repositories.StudentPrizeRepository;
import org.fblapbl.eventservice.repositories.StudentRepository;
import org.fblapbl.eventservice.util.Converters;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PrizeService {
    private final PrizeRepository prizeRepository;
    private final StudentRepository studentRepository;
    private final SchoolRepository schoolRepository;
    private final StudentPrizeRepository studentPrizeRepository;
    private final Converters converters;

    public PrizeService(PrizeRepository prizeRepository, StudentRepository studentRepository, SchoolRepository schoolRepository, StudentPrizeRepository studentPrizeRepository, Converters converters) {
        this.prizeRepository = prizeRepository;
        this.studentRepository = studentRepository;
        this.schoolRepository = schoolRepository;
        this.studentPrizeRepository = studentPrizeRepository;
        this.converters = converters;
    }

    public Prize createPrize(CreatePrizeInput createPrizeInput) {
        SchoolEntity schoolEntity = schoolRepository.findById(UUID.fromString(createPrizeInput.getSchoolId())).orElseThrow();
        PrizeEntity prizeEntity = converters.toEntity(createPrizeInput, schoolEntity);
        prizeRepository.save(prizeEntity);
        return converters.toGraphQLType(prizeEntity);
    }

    public Prize redeemPrize(String prizeId, String studentId) {
        StudentEntity studentEntity = studentRepository.findById(UUID.fromString(studentId)).orElseThrow();
        PrizeEntity prizeEntity = prizeRepository.findById(UUID.fromString(prizeId)).orElseThrow();

        if (studentEntity.getPoints() < prizeEntity.getPointsRequired()) {
            throw new IllegalArgumentException("Not Enough Points");
        } else {
            studentEntity.setPoints(studentEntity.getPoints() - prizeEntity.getPointsRequired());
            studentRepository.save(studentEntity);
            StudentPrizeEntity studentPrizeEntity = converters.toEntity(studentEntity, prizeEntity);
            studentPrizeRepository.save(studentPrizeEntity);
            return converters.toGraphQLType(prizeEntity);
        }
    }

    public List<Prize> getSchoolPrizes(String schoolId) {
        return prizeRepository.findAllBySchoolId(UUID.fromString(schoolId)).stream().map(converters::toGraphQLType).collect(Collectors.toList());
    }

    public List<Prize> getStudentPrizes(String studentId) {
        List<StudentPrizeEntity> studentPrizeEntities = studentPrizeRepository.findAllByStudentId(UUID.fromString(studentId));
        return studentPrizeEntities.stream().map((rec) -> converters.toGraphQLType(rec.getPrize())).collect(Collectors.toList());
    }

    public Prize givePrize(String prizeId, String studentId) {
        StudentEntity studentEntity = studentRepository.findById(UUID.fromString(studentId)).orElseThrow();
        PrizeEntity prizeEntity = prizeRepository.findById(UUID.fromString(prizeId)).orElseThrow();
        StudentPrizeEntity studentPrizeEntity = converters.toEntity(studentEntity, prizeEntity);
        studentPrizeRepository.save(studentPrizeEntity);
        return converters.toGraphQLType(prizeEntity);
    }
}
