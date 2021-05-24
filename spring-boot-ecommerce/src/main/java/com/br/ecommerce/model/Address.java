package com.br.ecommerce.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

import static javax.persistence.GenerationType.*;

@Entity
@Table(name = "address")
public class Address {

    @Id
    @SequenceGenerator(
            name = "address_sequence",
            sequenceName = "address_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "address_sequence"
    )
    @Column(name = "address_id")
    private Long id;

    @Column(name = "state")
    private String state;

    @Column(name = "city")
    private String city;

    @Column(name = "street")
    private String street;

    @Column(name = "zipCode")
    private String zipCode;

    @OneToOne
    @PrimaryKeyJoinColumn
    @JsonBackReference
    private Order order;

    public Address() {
    }

    public Address(String state, String city, String street, String zipCode) {
        this.state = state;
        this.city = city;
        this.street = street;
        this.zipCode = zipCode;
    }

    public Address(Long id, String state, String city, String street, String zipCode) {
        this.id = id;
        this.state = state;
        this.city = city;
        this.street = street;
        this.zipCode = zipCode;
    }

    public Address(String state, String city, String street, String zipCode, Order order) {
        this.state = state;
        this.city = city;
        this.street = street;
        this.zipCode = zipCode;
        this.order = order;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
