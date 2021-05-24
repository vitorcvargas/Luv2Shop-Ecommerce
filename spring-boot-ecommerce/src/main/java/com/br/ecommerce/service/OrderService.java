package com.br.ecommerce.service;

import com.br.ecommerce.dto.OrderResponseDTO;
import com.br.ecommerce.dto.PaginationDTO;
import com.br.ecommerce.model.Order;
import com.br.ecommerce.repository.OrderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository){
        this.orderRepository = orderRepository;
    }

    public OrderResponseDTO getOrdersByCustomerEmail(String email, int pageNumber, int pageSize) {

        PageRequest paging = PageRequest.of(pageNumber, pageSize);
        Page<Order> orderPage = orderRepository.findByCustomerEmailOrderByDateCreatedDesc(email, paging);

        return getOrderResponseDTO(orderPage);
    }

    private OrderResponseDTO getOrderResponseDTO(Page<Order> orderPage) {

        OrderResponseDTO orderResponseDTO = new OrderResponseDTO();
        PaginationDTO paginationDTO = new PaginationDTO();

        paginationDTO.pageNumber = orderPage.getNumber();
        paginationDTO.pageSize = orderPage.getSize();
        paginationDTO.totalElements = orderPage.getTotalElements();
        paginationDTO.totalPages = orderPage.getTotalPages();

        orderResponseDTO.orderList = orderPage.toList();
        orderResponseDTO.pagination = paginationDTO;

        return orderResponseDTO;
    }
}
