package com.example.events.eventapp.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Random;

@Entity
@Table(name="School")
@Getter
@Setter
public class SchoolEntity extends BaseEntity{
    @Column(name = "code", unique = true, updatable = false, nullable = false)
    private final Integer code = new Random().nextInt(999999);

    @Column(name = "name", nullable = false)
    private String name;
}
