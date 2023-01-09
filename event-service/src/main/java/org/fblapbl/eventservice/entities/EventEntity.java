package org.fblapbl.eventservice.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "event")
public class EventEntity extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "school_id", nullable = false)
    private SchoolEntity school;

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

    public EventEntity() {
    }

    public SchoolEntity getSchool() {
        return school;
    }

    public EventEntity setSchool(SchoolEntity schoolEntity) {
        this.school = schoolEntity;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public EventEntity setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public EventEntity setDescription(String description) {
        this.description = description;
        return this;
    }

    public Integer getPoints() {
        return points;
    }

    public EventEntity setPoints(Integer points) {
        this.points = points;
        return this;
    }

    public String getTime() {
        return time;
    }

    public EventEntity setTime(String time) {
        this.time = time;
        return this;
    }

    public Date getDate() {
        return date;
    }

    public EventEntity setDate(Date date) {
        this.date = date;
        return this;
    }

    public Integer getQuarter() {
        return quarter;
    }

    public EventEntity setQuarter(Integer quarter) {
        this.quarter = quarter;
        return this;
    }
}
