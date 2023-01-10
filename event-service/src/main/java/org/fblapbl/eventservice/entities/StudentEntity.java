package org.fblapbl.eventservice.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "student")
public class StudentEntity extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "school_id")
    private SchoolEntity school;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "grade")
    private int grade;

    @Column(name = "points")
    private int points;

    @Column(name = "q1_points")
    private int q1points;

    @Column(name = "q2_points")
    private int q2points;

    @Column(name = "q3_points")
    private int q3points;

    @Column(name = "q4_points")
    private int q4points;

    public StudentEntity() {
    }

    public SchoolEntity getSchool() {
        return school;
    }

    public StudentEntity setSchool(SchoolEntity school) {
        this.school = school;
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

    public int getGrade() {
        return grade;
    }

    public StudentEntity setGrade(int grade) {
        this.grade = grade;
        return this;
    }

    public int getPoints() {
        return points;
    }

    public StudentEntity setPoints(int points) {
        this.points = points;
        return this;
    }

    public int getQ1points() {
        return q1points;
    }

    public StudentEntity setQ1points(int q1points) {
        this.q1points = q1points;
        return this;
    }

    public int getQ2points() {
        return q2points;
    }

    public StudentEntity setQ2points(int q2points) {
        this.q2points = q2points;
        return this;
    }

    public int getQ3points() {
        return q3points;
    }

    public StudentEntity setQ3points(int q3points) {
        this.q3points = q3points;
        return this;
    }

    public int getQ4points() {
        return q4points;
    }

    public StudentEntity setQ4points(int q4points) {
        this.q4points = q4points;
        return this;
    }
}
