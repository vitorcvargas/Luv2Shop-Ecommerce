package com.br.ecommerce.controller;

import com.br.ecommerce.dto.OrderResponseDTO;
import com.br.ecommerce.service.OrderService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/orders")
public class OrderController {

    private OrderService orderService;

    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }

    @GetMapping(path = "search/findByCustomerEmail/{email}/{pageNumber}/{pageSize}")
    @ResponseBody
    public OrderResponseDTO getOrdersByCustomerEmail(
            @PathVariable String email,
            @PathVariable int pageNumber,
            @PathVariable int pageSize
    ){
        return orderService.getOrdersByCustomerEmail(email, pageNumber, pageSize);
    }

}
