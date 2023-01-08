package org.fblapbl.eventservice.entities;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "student")
public class StudentEntity extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "school_id")
    private SchoolEntity school;

    @Column(name = "auth_id", nullable = false, unique = true)
    private String authId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "grade")
    private Integer grade;

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

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private Set<StudentEventEntity> eventUserEntities = new HashSet<>();

    public StudentEntity() {
    }

    public SchoolEntity getSchool() {
        return school;
    }

    public StudentEntity setSchool(SchoolEntity school) {
        this.school = school;
        return this;
    }

    public String getAuthId() {
        return authId;
    }

    public StudentEntity setAuthId(String authId) {
        this.authId = authId;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public StudentEntity setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public StudentEntity setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public StudentEntity setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPhone() {
        return phone;
    }

    public StudentEntity setPhone(String phone) {
        this.phone = phone;
        return this;
    }

    public Integer getGrade() {
        return grade;
    }

    public StudentEntity setGrade(Integer grade) {
        this.grade = grade;
        return this;
    }

    public Integer getPoints() {
        return points;
    }

    public StudentEntity setPoints(Integer points) {
        this.points = points;
        return this;
    }

    public Integer getQ1points() {
        return q1points;
    }

    public StudentEntity setQ1points(Integer q1points) {
        this.q1points = q1points;
        return this;
    }

    public Integer getQ2points() {
        return q2points;
    }

    public StudentEntity setQ2points(Integer q2points) {
        this.q2points = q2points;
        return this;
    }

    public Integer getQ3points() {
        return q3points;
    }

    public StudentEntity setQ3points(Integer q3points) {
        this.q3points = q3points;
        return this;
    }

    public Integer getQ4points() {
        return q4points;
    }

    public StudentEntity setQ4points(Integer q4points) {
        this.q4points = q4points;
        return this;
    }

    public Set<StudentEventEntity> getEventUserEntities() {
        return eventUserEntities;
    }

    public StudentEntity setEventUserEntities(Set<StudentEventEntity> eventUserEntities) {
        this.eventUserEntities = eventUserEntities;
        return this;
    }
}
