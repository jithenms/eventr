package org.fblapbl.eventservice.entities;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "student_prize")
public class StudentPrizeEntity extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private StudentEntity student;

    @ManyToOne
    @JoinColumn(name = "prize_id", nullable = false)
    private PrizeEntity prizeId;

    public StudentPrizeEntity() {
    }

    public StudentEntity getStudent() {
        return student;
    }

    public StudentPrizeEntity setStudent(StudentEntity student) {
        this.student = student;
        return this;
    }

    public PrizeEntity getPrize() {
        return prizeId;
    }

    public StudentPrizeEntity setPrize(PrizeEntity prizeId) {
        this.prizeId = prizeId;
        return this;
    }
}
