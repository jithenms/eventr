package org.fblapbl.eventservice.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "prize")
public class PrizeEntity extends BaseEntity {
    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "points_required")
    private Integer pointsRequired;

    @ManyToOne
    @JoinColumn(name = "school_id")
    private SchoolEntity school;

    public PrizeEntity() {
    }

    public String getDescription() {
        return description;
    }

    public PrizeEntity setDescription(String description) {
        this.description = description;
        return this;
    }

    public String getName() {
        return name;
    }

    public PrizeEntity setName(String name) {
        this.name = name;
        return this;
    }

    public Integer getPointsRequired() {
        return pointsRequired;
    }

    public PrizeEntity setPointsRequired(Integer pointsRequired) {
        this.pointsRequired = pointsRequired;
        return this;
    }

    public SchoolEntity getSchool() {
        return school;
    }

    public PrizeEntity setSchool(SchoolEntity school) {
        this.school = school;
        return this;
    }
}
