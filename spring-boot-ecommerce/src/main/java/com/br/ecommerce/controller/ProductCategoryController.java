package com.br.ecommerce.controller;

import com.br.ecommerce.model.ProductCategory;
import com.br.ecommerce.service.ProductCategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/product-category")
public class ProductCategoryController {

    private ProductCategoryService productCategoryService;

    public ProductCategoryController(ProductCategoryService productCategoryService){
        this.productCategoryService = productCategoryService;
    }

    @GetMapping
    @ResponseBody
    public List<ProductCategory> getListProductCategory(){
        return productCategoryService.getListProductCategory();
    }

    @PostMapping
    public String save(@RequestBody ProductCategory productCategory){
        productCategoryService.save(productCategory);
        return "worked";
    }

    @PostMapping(path = "save-all")
    public String saveAll(@RequestBody ProductCategory[] productCategoryList){
        productCategoryService.saveAll(productCategoryList);

        return "Categories saved";
    }
}
