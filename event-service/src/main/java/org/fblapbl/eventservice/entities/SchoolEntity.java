package org.fblapbl.eventservice.entities;

import javax.persistence.*;

@Entity
@Table(name = "school")
public class SchoolEntity extends BaseEntity {
    @Column(unique = true)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "join_code_generator")
    @SequenceGenerator(name = "join_code_generator", sequenceName = "join_code_seq", allocationSize = 1)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "address")
    private String address;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "country")
    private String country;

    @Column(name = "zip_code")
    private String zipCode;

    public SchoolEntity() {
    }

    public String getCode() {
        return code;
    }

    public SchoolEntity setCode(String code) {
        this.code = code;
        return this;
    }

    public String getName() {
        return name;
    }

    public SchoolEntity setName(String name) {
        this.name = name;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public SchoolEntity setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getAddress() {
        return address;
    }

    public SchoolEntity setAddress(String address) {
        this.address = address;
        return this;
    }

    public String getCity() {
        return city;
    }

    public SchoolEntity setCity(String city) {
        this.city = city;
        return this;
    }

    public String getState() {
        return state;
    }

    public SchoolEntity setState(String state) {
        this.state = state;
        return this;
    }

    public String getCountry() {
        return country;
    }

    public SchoolEntity setCountry(String country) {
        this.country = country;
        return this;
    }

    public String getZipCode() {
        return zipCode;
    }

    public SchoolEntity setZipCode(String zipCode) {
        this.zipCode = zipCode;
        return this;
    }
}
