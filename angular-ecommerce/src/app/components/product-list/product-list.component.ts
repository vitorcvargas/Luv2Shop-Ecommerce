import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 1;

  previousKeyword: string = "";

  constructor(private productService : ProductService, private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts(){

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){

      this.handleSearchProducts();

    }else{
      
      this.handleListProducts();
      
    }
    

  }
  
  handleSearchProducts() {
    const keyWord: string = this.route.snapshot.paramMap.get("keyword")!;

    if(this.previousKeyword != keyWord){
      this.pageNumber = 1;
    }

    this.previousKeyword = keyWord;

    console.log(`keyword= ${keyWord}, pageNumber= ${this.pageNumber}`);

    this.productService.getProductsPaginatedByKeyWord(
                                                keyWord, 
                                                this.pageNumber - 1, 
                                                this.pageSize)
                                                .subscribe(
                                                  this.processResult()
                                                  );
  }

  handleListProducts(){
    
    const hasCategorId = this.route.snapshot.paramMap.has('id');

    if(hasCategorId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }else{
      this.currentCategoryId = 1;
    }

    if(this.previousCategoryId != this.currentCategoryId){
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, pageNumber=${this.pageNumber}`)

    this.productService.getProductsPaginatedById(this.currentCategoryId,this.pageNumber - 1, this.pageSize)
                                              .subscribe(
                                                this.processResult()
                                              );
                                                 

  }

  processResult(){
    return (data:any) => {
      this.products = data.products;
      this.pageNumber = data.pagination.pageNumber + 1;
      this.pageSize = data.pagination.pageSize;
      this.totalElements = data.pagination.totalElements;
    };
  }

  updatePageSize(pageSize: Event){
    this.pageSize = +(pageSize.currentTarget as HTMLInputElement).value;
    this.pageNumber = 1;
    this.listProducts();
  }

  addToCart(product: Product){
    console.log(`Adding to cart: ${product.name}, ${product.unitPrice}`)

    const cartItem = new CartItem(product);

    this.cartService.addToCart(cartItem);
  }

}
