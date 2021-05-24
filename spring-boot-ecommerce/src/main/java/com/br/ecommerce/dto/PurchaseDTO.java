package com.br.ecommerce.dto;

import com.br.ecommerce.model.Address;
import com.br.ecommerce.model.Customer;
import com.br.ecommerce.model.Order;
import com.br.ecommerce.model.OrderItem;

import java.util.Set;

public class PurchaseDTO {

    public Customer customer;
    public Address shippingAddress;
    public Address billingAddress;
    public Order order;
    public Set<OrderItem> orderItems;
}
