package com.br.ecommerce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Table(name = "product_category")
public class ProductCategory {

    @Id
    @SequenceGenerator(
            name="product_category_sequence",
            sequenceName = "product_category_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "product_category_sequence"
    )
    @Column(
            name = "category_id",
            updatable = false
    )
    private Long id;
    @Column(name = "category_name")
    private String categoryName;

    @Column(name= "products")
    @OneToMany(
            cascade = CascadeType.ALL,
            mappedBy = "category"
    )
    @JsonIgnore
    private Set<Product> products;

    public ProductCategory() {}

    public ProductCategory(Long id, String categoryName, Set<Product> products) {
        this.id = id;
        this.categoryName = categoryName;
        this.products = products;
    }

    public ProductCategory(String categoryName, Set<Product> products) {
        this.categoryName = categoryName;
        this.products = products;
    }

    public ProductCategory(Long id) {
        this.id = id;
    }

    public ProductCategory(String categoryName) {
        this.categoryName = categoryName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
}

