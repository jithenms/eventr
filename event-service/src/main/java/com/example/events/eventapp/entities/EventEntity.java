package com.example.events.eventapp.entities;

import com.example.events.eventapp.generated.types.Event;
import lombok.Getter;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "event")
@Getter
@Setter
public class EventEntity extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    private TeacherEntity teacher;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "points", nullable = false)
    private Integer points;

    @Column(name = "time", nullable = false)
    private String time;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "quarter", nullable = false)
    private Integer quarter;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "events")
    @JsonIgnore
    private Set<StudentEntity> students = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "requests")
    @JsonIgnore
    private Set<StudentEntity> studentRequests = new HashSet<>();

}
