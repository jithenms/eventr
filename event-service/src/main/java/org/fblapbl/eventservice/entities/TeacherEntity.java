package org.fblapbl.eventservice.entities;

import javax.persistence.*;

@Entity
@Table(name = "teacher")
public class TeacherEntity extends BaseEntity {
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

    public TeacherEntity() {
    }

    public SchoolEntity getSchool() {
        return school;
    }

    public TeacherEntity setSchool(SchoolEntity school) {
        this.school = school;
        return this;
    }

    public String getAuthId() {
        return authId;
    }

    public TeacherEntity setAuthId(String authId) {
        this.authId = authId;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public TeacherEntity setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public TeacherEntity setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public TeacherEntity setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPhone() {
        return phone;
    }

    public TeacherEntity setPhone(String phone) {
        this.phone = phone;
        return this;
    }
}
