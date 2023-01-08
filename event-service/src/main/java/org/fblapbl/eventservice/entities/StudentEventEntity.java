package org.fblapbl.eventservice.entities;

import javax.persistence.*;

@Entity
@Table(name = "student_event")
public class StudentEventEntity extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private EventEntity event;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private StudentEntity student;

    @Column(name = "status")
    @Enumerated(value = EnumType.STRING)
    private StudentEventStatus status;

    public StudentEventEntity() {
    }

    public EventEntity getEvent() {
        return event;
    }

    public StudentEventEntity setEvent(EventEntity event) {
        this.event = event;
        return this;
    }

    public StudentEntity getStudent() {
        return student;
    }

    public StudentEventEntity setStudent(StudentEntity student) {
        this.student = student;
        return this;
    }

    public StudentEventStatus getStatus() {
        return status;
    }

    public StudentEventEntity setStatus(StudentEventStatus status) {
        this.status = status;
        return this;
    }
}


