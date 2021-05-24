package com.br.ecommerce.dto;

import com.br.ecommerce.model.Order;

import java.util.List;

public class OrderResponseDTO {

    public List<Order> orderList;
    public PaginationDTO pagination;
}
