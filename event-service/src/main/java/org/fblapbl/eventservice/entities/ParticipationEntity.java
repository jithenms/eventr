package org.fblapbl.eventservice.entities;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "participation")
public class ParticipationEntity extends BaseEntity {
    @Column(name = "student_id", nullable = false)
    private UUID studentId;

    @Column(name = "event_id", nullable = false)
    private UUID eventId;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ParticipationStatus status;

    public ParticipationEntity() {
    }

    public UUID getStudentId() {
        return studentId;
    }

    public void setStudentId(UUID studentId) {
        this.studentId = studentId;
    }

    public UUID getEventId() {
        return eventId;
    }

    public void setEventId(UUID eventId) {
        this.eventId = eventId;
    }

    public ParticipationStatus getStatus() {
        return status;
    }

    public void setStatus(ParticipationStatus status) {
        this.status = status;
    }
}


