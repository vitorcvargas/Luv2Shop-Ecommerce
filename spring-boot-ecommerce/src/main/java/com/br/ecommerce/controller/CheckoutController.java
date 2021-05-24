package com.br.ecommerce.controller;

import com.br.ecommerce.dto.PurchaseDTO;
import com.br.ecommerce.dto.PurchaseResponseDTO;
import com.br.ecommerce.service.CheckoutService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService){

        this.checkoutService = checkoutService;
    }

    @PostMapping(path = "purchase")
    public PurchaseResponseDTO placeOrder(@RequestBody PurchaseDTO purchaseDTO){

        return checkoutService.placeOrder(purchaseDTO);
    }
}
