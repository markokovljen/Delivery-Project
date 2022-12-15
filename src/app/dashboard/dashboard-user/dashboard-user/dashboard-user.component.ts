import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Order } from 'src/app/model/order';
import { AlertifyService } from 'src/app/services/alertify.service';
import { OrderService } from 'src/app/services/order.service';
import { AddOrderAction } from 'src/app/store/orders/order-actions';

declare let paypal: any;

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {

  addOrderForm!: FormGroup;
  orderSubmitted!:boolean;
  order!: Order;
  userId! : number;
  orderPrice! : number;
  products!: {productId : number, quantity: number} [];
  tempProducts!: {productId : number, quantity: number,price: number} [];
  deliveryPrice : number = 10;
  paypal: any;
  addScript: boolean = false;

  constructor(private fb: FormBuilder,
              private alertify : AlertifyService,
              private orderService: OrderService,
              private store: Store) { }

  ngOnInit() {
    this.createOrderForm()
    this.products = []
    this.tempProducts = []
  }

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AVRYW8PsEVx1mt4V7GBXcHHhUCnQyatrGJffvMmPJekR1QURipkCxYywPrQDEFiWunLSu4VcTdeuqGKF',
      production: 'EKYI-pyoEHDMlIQIOZkE4oKmlNgrMXHOPHydz-_SzA6X0fuHnBj_Mbu19tA6QKaRsvOaDovI8MMEN8lO'
    },
    commit: true,
    payment: (data: any, actions: any) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {amount: {total: 200, currency: 'USD'}}
          ]
        }
      });
    },
    onAuthorize: (data:any, actions:any) => {
      return actions.payment.execute().then((payment:any) => {
        this.onSubmit();
      })
    }
  }

  ngAfterViewChecked(): void {
    if(!this.addScript){
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
      })
    }
  }

  addPaypalScript(){
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'http://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }


  createOrderForm(){
    this.addOrderForm=this.fb.group({
      homeAddress:[null,Validators.required],
      comment:[null,Validators.required],
    })
  }


  onSubmit(){
    this.orderSubmitted=true;

    if(this.addOrderForm.valid){
      if(this.tempProducts.length == 0){
        this.alertify.error('You need to add product to your order!');
      }
      let orderPrice = 0
      for(let product of this.tempProducts){
        let temp = {productId : product.productId,quantity: product.quantity}
        this.products.push(temp);
        orderPrice += product.price * product.quantity;
      }
      this.orderPrice = orderPrice + this.deliveryPrice;
      this.userId = +localStorage.getItem('id')!
      this.applyOrder();
      console.log(this.order)

      this.store.dispatch(new AddOrderAction(this.order))
    }
  }

  applyOrder(){
    this.order = {
      userId: this.userId,
      homeAddress: this.homeAddress.value,
      comment: this.comment.value,
      orderPrice: this.orderPrice,
      products: this.products
    }
  }

  onNumberOfProductsAdded(eventData: { id : number, price:number ,numberOfP: number  }){
    let product = {productId : eventData.id ,quantity: eventData.numberOfP, price:eventData.price}
    for(let product of this.tempProducts){
      if(product.productId == eventData.id){
        product.quantity = eventData.numberOfP
        this.alertify.success('Product quantity has changed!');
        return;
      }
    }
    this.tempProducts.push(product)
    this.alertify.success('Product added to cart!');
  }

  get homeAddress(){
    return this.addOrderForm.get('homeAddress') as FormControl;
  }

  get comment(){
    return this.addOrderForm.get('comment') as FormControl;
  }

}
