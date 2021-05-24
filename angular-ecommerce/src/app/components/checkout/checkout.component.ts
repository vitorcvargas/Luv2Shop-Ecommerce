import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CEP } from 'src/app/common/cep';
import { City } from 'src/app/common/city';
import { Luv2ShopValidators } from 'src/app/common/luv-2-shop-validators';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  shippingStates: State[] = [];
  shippingCities: City[] = [];

  billingStates: State[] = [];
  billingCities: City[] = [];

  isShippingFormTouched: boolean = false;
  isBillingFormTouched: boolean = false;

  sessionStorage: Storage = sessionStorage;

  userEmail: string = '';

  constructor(private formBuilder: FormBuilder, private luv2ShopFormService: Luv2ShopFormService, 
              private cartService: CartService, private CheckoutService: CheckoutService,
              private router: Router) { }

  ngOnInit(): void {

    this.reviewCartDetails()

    this.userEmail = JSON.parse(this.sessionStorage.getItem("userEmail"));

    this.initializeForm();

    this.luv2ShopFormService.getCreditCardMonths(1).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    this.luv2ShopFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

    this.luv2ShopFormService.getStates().subscribe(
      data => {
        console.log(data);
        this.shippingStates = data;
        this.billingStates = data;
      }
    );

  }
  reviewCartDetails() {
    
    this.cartService.totalPrice.subscribe(

      totalPrice => {

        this.totalPrice = totalPrice;
      }
    );

    this.cartService.totalQuantity.subscribe(

      totalQuantity => {

        this.totalQuantity = totalQuantity;
      }
    );
  }

  getCities(event: any){

    let uf: string = (event.currentTarget as HTMLInputElement).value;

    this.luv2ShopFormService.getCities(uf).subscribe(

      data => {

        if(this.isShippingFormTouched){

          this.shippingCities = data;
          this.checkoutFormGroup.controls.shippingAddress.get("city")?.setValue(data[0]);

        }else{

          this.billingCities = data;
          this.checkoutFormGroup.controls.billingAddress.get("city")?.setValue(data[0]);
        }
        
      }
    );

  }

  onSubmit(){

    console.log(this.checkoutFormGroup.value)

    if(this.checkoutFormGroup.invalid){
      
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    const cartItems = this.cartService.cartItems;
    let orderItems: OrderItem[] = cartItems.map(cartItem => new OrderItem(cartItem));

    let purchase = new Purchase();
    purchase.shippingAddress = this.checkoutFormGroup.controls.shippingAddress.value;
    purchase.billingAddress = this.checkoutFormGroup.controls.billingAddress.value;
    purchase.customer = this.checkoutFormGroup.controls.customer.value;
    purchase.order = order;
    purchase.orderItems = orderItems;
    
    this.CheckoutService.placeOrder(purchase).subscribe({
        next: response => {
          alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);

          this.resetCart();
        },
        error: err => {
          alert(`There was an error: ${err.message}`);
        }
      }
    )
  } 
  resetCart() {
    
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    this.checkoutFormGroup.reset();

    this.router.navigateByUrl("/products")
  }

  copyShippingAddressToBillingAddress(event: any){

    if(event.target.checked){

      this.checkoutFormGroup.controls.billingAddress
          .setValue(this.checkoutFormGroup.controls.shippingAddress.value)
      
      this.billingCities = this.shippingCities;
    }else{  

      this.checkoutFormGroup.controls.billingAddress.reset();

      this.billingCities = []
    }

  }

  handleMonthsAndYears(){

    let creditCardForm = this.checkoutFormGroup.get("creditCard");

    const currentYear = new Date().getFullYear();
    const selectedYear = Number(creditCardForm?.value.expirationYear);

    let startMonth: number;

    if(selectedYear === currentYear){
      startMonth = new Date().getMonth() + 1;
    }else{
      startMonth = 1;
    }

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

  }

  async populateAddressBasedOnCEP(event: Event){

    let cep: string = (event.currentTarget as HTMLInputElement).value;

    const CEPDetails = await this.luv2ShopFormService.getCEP(cep).toPromise();
    
    this.isShippingFormTouched ? 
                  this.shippingCities = [{nome: CEPDetails.localidade}] :
                  this.billingCities = [{nome: CEPDetails.localidade}]

    let addressForm = this.getCurrentAddressForm();

    addressForm.setValue({

      street: CEPDetails.logradouro,
      state: CEPDetails.uf,
      city: CEPDetails.localidade,
      zipCode: CEPDetails.cep

    });

  }

  clearZipCode(){

    let tempAddressForm = this.getCurrentAddressForm().value;

    let addressForm = this.getCurrentAddressForm();

    addressForm.patchValue({

      zipCode: [""],
      street: tempAddressForm.street,
      state: tempAddressForm.state,
      city: tempAddressForm.city

    })

  }

  getCurrentAddressForm(): AbstractControl{

    let form;

    this.isShippingFormTouched ? 
              form = this.checkoutFormGroup.controls.shippingAddress :
              form = this.checkoutFormGroup.controls.billingAddress;
    
    return form;
  }

  setShippingFormAsTouched(){
    
    this.isShippingFormTouched = true;
    this.isBillingFormTouched = false;

  }

  setBillingFormAsTouched(){
    
    this.isBillingFormTouched = true;
    this.isShippingFormTouched = false;

  }

  initializeForm(){

    this.checkoutFormGroup = this.formBuilder.group({
        
      customer: this.formBuilder.group({

        firstName: new FormControl('',[Validators.required, Validators.minLength(2), 
                                       Luv2ShopValidators.notOnlyWhitespace]),
                                      
        lastName: new FormControl('', 
                                      [Validators.required, Validators.minLength(2), 
                                       Luv2ShopValidators.notOnlyWhitespace]),

        email: new FormControl(this.userEmail, 
                                  [Validators.required, 
                                   Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
      }),
      
      shippingAddress: this.formBuilder.group({

        street: new FormControl('', [Validators.required, Validators.minLength(2), 
                                     Luv2ShopValidators.notOnlyWhitespace]),
                                     
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', Validators.pattern("[0-9-]{8,9}"))
      }),
      
      billingAddress: this.formBuilder.group({

        street: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', Validators.pattern("[0-9-]{8,9}"))
      }),
      
      creditCard: this.formBuilder.group({

        cardType: new FormControl('', Validators.required),

        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), 
                                         Luv2ShopValidators.notOnlyWhitespace]),

        cardNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]{16}")]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern("[0-9]{3}")]),
        expirationMonth: new FormControl('', Validators.required),
        expirationYear: new FormControl('', Validators.required),
      })
    });
  }

  get getControl(){return this.checkoutFormGroup.controls;}

  // getters customerForm
  get firstName(){return this.checkoutFormGroup.controls.customer.get('firstName');}
  get lastName(){return this.checkoutFormGroup.controls.customer.get('lastName');}
  get email(){return this.checkoutFormGroup.controls.customer.get('email');}

  // getters shippingAddressForm
  get shippingZipCode(){return this.checkoutFormGroup.controls.shippingAddress.get('zipCode');}
  get shippingState(){return this.checkoutFormGroup.controls.shippingAddress.get('state');}
  get shippingCity(){return this.checkoutFormGroup.controls.shippingAddress.get('city');}
  get shippingStreet(){return this.checkoutFormGroup.controls.shippingAddress.get('street');}

  // getters billingAddressForm
  get billingState(){return this.checkoutFormGroup.controls.billingAddress.get('state');}
  get billingZipCode(){return this.checkoutFormGroup.controls.billingAddress.get('zipCode');}
  get billingCity(){return this.checkoutFormGroup.controls.billingAddress.get('city');}
  get billingStreet(){return this.checkoutFormGroup.controls.billingAddress.get('street');}

  // getters creditCardForm
  get cardType(){return this.checkoutFormGroup.controls.creditCard.get('cardType');}
  get nameOnCard(){return this.checkoutFormGroup.controls.creditCard.get('nameOnCard');}
  get cardNumber(){return this.checkoutFormGroup.controls.creditCard.get('cardNumber');}
  get securityCode(){return this.checkoutFormGroup.controls.creditCard.get('securityCode');}
  get expirationMonth(){return this.checkoutFormGroup.controls.creditCard.get('expirationMonth');}
  get expirationYear(){return this.checkoutFormGroup.controls.creditCard.get('expirationYear');}
}
