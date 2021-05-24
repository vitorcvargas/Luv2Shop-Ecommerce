package com.br.ecommerce.service;

import com.br.ecommerce.dto.PaginationDTO;
import com.br.ecommerce.dto.ProductResponseDTO;
import com.br.ecommerce.model.Product;
import com.br.ecommerce.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    public void save(Product product){
        productRepository.save(product);
    }

    public void saveAll(Product[] productList) {

        for (Product product:productList) {
            productRepository.save(product);
        }
    }

    public Product getProductById(Long id){
        return productRepository.findById(id).get();
    }

    public ProductResponseDTO getProductsByCategoryId(Long id, int pageNumber, int pageSize) {

        PageRequest paging = PageRequest.of(pageNumber,pageSize);
        Page<Product> productsPage = productRepository.findByCategoryId(id, paging);

        return getProductResponseDTO(productsPage);
    }

    public ProductResponseDTO getProductByNameContaining(String name, int pageNumber, int pageSize) {

        PageRequest paging = PageRequest.of(pageNumber,pageSize);
        Page<Product> productsPage = productRepository.findByNameContainingIgnoreCase(name, paging);

        return getProductResponseDTO(productsPage);
    }

    private ProductResponseDTO getProductResponseDTO(Page<Product> productPage) {

        ProductResponseDTO productDTOResponseResponse = new ProductResponseDTO();

        PaginationDTO paginationDTO = new PaginationDTO();

        paginationDTO.pageNumber = productPage.getNumber();
        paginationDTO.pageSize = productPage.getSize();
        paginationDTO.totalElements = productPage.getTotalElements();
        paginationDTO.totalPages = productPage.getTotalPages();

        productDTOResponseResponse.products = productPage.toList();
        productDTOResponseResponse.pagination = paginationDTO;

        return productDTOResponseResponse;
    }

}
