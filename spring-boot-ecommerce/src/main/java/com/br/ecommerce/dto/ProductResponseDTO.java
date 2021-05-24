package com.br.ecommerce.dto;

import com.br.ecommerce.model.Product;

import java.util.List;

public class ProductResponseDTO {

    public List<Product> products;
    public PaginationDTO pagination;
}
