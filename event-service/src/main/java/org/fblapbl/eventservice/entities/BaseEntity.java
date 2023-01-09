package org.fblapbl.eventservice.entities;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@MappedSuperclass
public class BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @Column(name = "updated_at", nullable = false)
    private Date updatedAt;

    public BaseEntity() {
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
        this.updatedAt = this.createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

    public UUID getId() {
        return id;
    }

    public BaseEntity setId(UUID id) {
        this.id = id;
        return this;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public BaseEntity setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public BaseEntity setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }
}
