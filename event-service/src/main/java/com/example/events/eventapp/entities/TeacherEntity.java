package com.example.events.eventapp.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="teacher")
@Getter
@Setter
public class TeacherEntity extends BaseEntity {
    @Column(name="auth_id", nullable = false, unique = true)
    private String authId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;
}
