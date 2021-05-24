package com.br.ecommerce.controller;

import com.br.ecommerce.dto.ProductResponseDTO;
import com.br.ecommerce.model.Product;
import com.br.ecommerce.service.ProductService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="api/products")
public class ProductController {

    private ProductService productService;

    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping(path = "search/findByCategoryId/{id}/{pageNumber}/{pageSize}")
    @ResponseBody
    public ProductResponseDTO getProductsById(
            @PathVariable Long id,
            @PathVariable int pageNumber,
            @PathVariable int pageSize
    ){
        return productService.getProductsByCategoryId(id, pageNumber, pageSize);
    }

    @GetMapping(path = "search/findByNameContaining/{name}/{pageNumber}/{pageSize}")
    @ResponseBody
    public ProductResponseDTO getProductByNameContaining(
            @PathVariable String name,
            @PathVariable int pageNumber,
            @PathVariable int pageSize
    ){
        return productService.getProductByNameContaining(name, pageNumber, pageSize);
    }

    @GetMapping(path = "search/findProductById/{id}")
    @ResponseBody
    public Product getProductById(@PathVariable Long id){
        return productService.getProductById(id);
    }

    @PostMapping
    public String saveProduct(@RequestBody Product product){
        productService.save(product);
        return "product saved";
    }

    @PostMapping(path = "save-all")
    public String saveAll(@RequestBody Product[] productList){
        productService.saveAll(productList);
        return "Products saved";
    }
}
