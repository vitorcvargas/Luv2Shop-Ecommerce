import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private productBaseUrl = "http://localhost:8080/api/products";
  private productCategoryBaseUrl = "http://localhost:8080/api/product-category";

  constructor(private httpClient : HttpClient) {  }

  getProductsPaginatedById(
                          categoryId: number,
                          pageNumber: number,
                          pageSize: number
                        ): Observable<GetResponseProducts>{

    const searchUrl = `${this.productBaseUrl}/search/findByCategoryId/${categoryId}`
                      + `/${pageNumber}/${pageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductsPaginatedByKeyWord(
                          keyWord: string,
                          pageNumber: number,
                          pageSize: number
                        ): Observable<GetResponseProducts>{

    const searchUrl = `${this.productBaseUrl}/search/findByNameContaining/${keyWord}`
                      + `/${pageNumber}/${pageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
  
  getProductDetails(id: number): Observable<Product>{

    const searchUrl = `${this.productBaseUrl}/search/findProductById/${id}`;

    return this.httpClient.get<Product>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]>{
    
    return this.httpClient.get<ProductCategory[]>(this.productCategoryBaseUrl);
  }

  /*
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response.products)
    );
  }
  */
}

interface GetResponseProducts{
  
  products: Product[],
  pagination: {
    pageNumber: number,
    pageSize: number,
    totalElements: number,
    totalPages: number
  }

}
