package com.example.events.eventapp.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="student")
    @Getter
    @Setter
public class StudentEntity extends BaseEntity {
    @Column(name="auth_id", nullable = false, unique = true)
    private String authId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "points")
    private Integer points;

    @Column(name = "q1points")
    private Integer q1points;

    @Column(name = "q2points")
    private Integer q2points;

    @Column(name = "q3points")
    private Integer q3points;

    @Column(name = "q4points")
    private Integer q4points;

    @Column(name = "grade")
    private Integer grade;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "event_students",
            joinColumns = {@JoinColumn(name = "student_id")},
            inverseJoinColumns = {@JoinColumn(name = "event_id")})
    private Set<EventEntity> events = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "event_requests",
            joinColumns = { @JoinColumn(name = "student_id") },
            inverseJoinColumns = { @JoinColumn(name = "event_id") })
    private Set<EventEntity> requests = new HashSet<>();



}
