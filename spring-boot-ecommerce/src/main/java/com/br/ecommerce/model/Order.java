package com.br.ecommerce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @SequenceGenerator(
            name = "orders_sequence",
            sequenceName = "orders_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "orders_sequence"
    )
    @Column(name = "order_id")
    private Long id;

    @Column(name = "order_tracking_number")
    private String orderTrackingNumber;

    @Column(name = "total_quantity")
    private int totalQuantity;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

    @Column(name = "status")
    private String status;

    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "last_update")
    @UpdateTimestamp
    @JsonIgnore
    private Date lastUpdate;

    @ManyToOne
    @JoinColumn(
            name = "customer_id"//,
            //referencedColumnName = "customer_id"
    )
    private Customer customer;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(
            name = "shipping_address_id",
            referencedColumnName = "address_id"
    )
    @JsonManagedReference
    private Address shippingAddress;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(
            name = "billing_address_id",
            referencedColumnName = "address_id"
    )
    @JsonManagedReference
    private Address billingAddress;

    @OneToMany(
            cascade = CascadeType.ALL,
            mappedBy = "order"
    )
    @JsonManagedReference
    private Set<OrderItem> orderItems = new HashSet<>();


    public void add(OrderItem orderItem){
        if(orderItem != null){

            if(orderItems == null){

                this.orderItems = new HashSet<>();
            }

            this.orderItems.add(orderItem);
            orderItem.setOrder(this);
        }
    }

    public Order() {
    }

    public Order(String orderTrackingNumber, int totalQuantity, BigDecimal totalPrice, String status, Date dateCreated, Date lastUpdate, Customer customer) {
        this.orderTrackingNumber = orderTrackingNumber;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
        this.status = status;
        this.dateCreated = dateCreated;
        this.lastUpdate = lastUpdate;
        this.customer = customer;
    }

    public Order(Long id, String orderTrackingNumber, int totalQuantity, BigDecimal totalPrice, String status, Date dateCreated, Date lastUpdate, Customer customer) {
        this.id = id;
        this.orderTrackingNumber = orderTrackingNumber;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
        this.status = status;
        this.dateCreated = dateCreated;
        this.lastUpdate = lastUpdate;
        this.customer = customer;
    }

    public Order(String orderTrackingNumber, int totalQuantity, BigDecimal totalPrice, String status, Customer customer) {
        this.orderTrackingNumber = orderTrackingNumber;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
        this.status = status;
        this.customer = customer;
    }

    public Order(String orderTrackingNumber, int totalQuantity, BigDecimal totalPrice, String status, Customer customer, Set<OrderItem> orderItems) {
        this.orderTrackingNumber = orderTrackingNumber;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
        this.status = status;
        this.customer = customer;
        this.orderItems = orderItems;
    }

    public Order(String orderTrackingNumber, int totalQuantity, BigDecimal totalPrice, String status, Customer customer, Address shippingAddress, Address billingAddress, Set<OrderItem> orderItems) {
        this.orderTrackingNumber = orderTrackingNumber;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
        this.status = status;
        this.customer = customer;
        this.shippingAddress = shippingAddress;
        this.billingAddress = billingAddress;
        this.orderItems = orderItems;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderTrackingNumber() {
        return orderTrackingNumber;
    }

    public void setOrderTrackingNumber(String orderTrackingNumber) {
        this.orderTrackingNumber = orderTrackingNumber;
    }

    public int getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(Date lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public Customer getCostumer() {
        return customer;
    }

    public void setCostumer(Customer customer) {
        this.customer = customer;
    }

    public Address getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(Address shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public Address getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(Address billingAddress) {
        this.billingAddress = billingAddress;
    }

    public Set<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(Set<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
}
