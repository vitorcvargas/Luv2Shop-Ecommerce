import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  storage: Storage = localStorage;

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { 

    //read data from storage
    let data = JSON.parse(this.storage.getItem('cartItems'));

    if(data != null){

      this.cartItems = data;

      //compute totals based on the data that is read from storage
      this.computeCartTotals();
    }
  }

  persistCartItems(){

    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  addToCart(cartItem: CartItem){

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined= undefined;

    existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id);

    alreadyExistsInCart = (existingCartItem != undefined);

    if(alreadyExistsInCart){

      existingCartItem!.quantity++;

    }else{

      this.cartItems.push(cartItem);

    }

    this.computeCartTotals();
  }

  computeCartTotals(){
    
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let cartItem of this.cartItems){

      totalPriceValue += (cartItem.unitPrice * cartItem.quantity);
      totalQuantityValue += cartItem.quantity;

    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue)

    this.persistCartItems();
  }

  decrementQuantity(cartItem: CartItem){

    cartItem.quantity--;
    
    if(cartItem.quantity === 0){
      
      this.remove(cartItem);
    }else{

      this.computeCartTotals();
    }
  }

  remove(cartItem: CartItem){

    let index = this.cartItems.findIndex(tempCartItem => tempCartItem.id === cartItem.id);

    if(index > -1){
      this.cartItems.splice(index,1);
    }

    this.computeCartTotals();

  }
}
