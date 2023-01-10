package org.fblapbl.eventservice.entities;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "participation")
public class ParticipationEntity extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private StudentEntity student;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private EventEntity event;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ParticipationStatus status;

    public ParticipationEntity() {
    }

    public StudentEntity getStudent() {
        return student;
    }

    public ParticipationEntity setStudent(StudentEntity student) {
        this.student = student;
        return this;
    }

    public EventEntity getEvent() {
        return event;
    }

    public ParticipationEntity setEvent(EventEntity event) {
        this.event = event;
        return this;
    }

    public ParticipationStatus getStatus() {
        return status;
    }

    public ParticipationEntity setStatus(ParticipationStatus status) {
        this.status = status;
        return this;
    }
}


