package com.br.ecommerce.service;

import com.br.ecommerce.model.ProductCategory;
import com.br.ecommerce.repository.ProductCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoryService {

    private final ProductCategoryRepository productCategoryRepository;

    public ProductCategoryService(ProductCategoryRepository productCategoryRepository){
        this.productCategoryRepository = productCategoryRepository;
    }

    public List<ProductCategory> getListProductCategory(){

        return productCategoryRepository.findAll();
    }

    public void save(ProductCategory productCategory){
        productCategoryRepository.save(productCategory);
    }

    public void saveAll(ProductCategory[] productCategoryList) {

        for (ProductCategory productCategory: productCategoryList) {
            productCategoryRepository.save(productCategory);
        }
    }
}
