package com.br.ecommerce.service;

import com.br.ecommerce.dto.PurchaseDTO;
import com.br.ecommerce.dto.PurchaseResponseDTO;
import com.br.ecommerce.model.Customer;
import com.br.ecommerce.model.Order;
import com.br.ecommerce.model.OrderItem;
import com.br.ecommerce.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutService {

    private CustomerRepository customerRepository;

    public CheckoutService(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    @Transactional
    public PurchaseResponseDTO placeOrder(PurchaseDTO purchaseDTO){

        Order order = purchaseDTO.order;

        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        Set<OrderItem> orderItems = purchaseDTO.orderItems;
        orderItems.forEach(orderItem -> order.add(orderItem));

        order.setShippingAddress(purchaseDTO.shippingAddress);
        order.setBillingAddress(purchaseDTO.billingAddress);

        Customer customer = purchaseDTO.customer;

        Customer customerDB = customerRepository.findByEmail(customer.getEmail());

        if(customerDB != null){

            customer = customerDB;
        }

        customer.addOrder(order);

        customerRepository.save(customer);

        PurchaseResponseDTO purchaseResponseDTO = new PurchaseResponseDTO();
        purchaseResponseDTO.orderTrackingNumber = orderTrackingNumber;

        return purchaseResponseDTO;
    }

    private String generateOrderTrackingNumber() {

        return UUID.randomUUID().toString();
    }
}
