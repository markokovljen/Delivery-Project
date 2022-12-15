import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Output() numberOfProducts = new EventEmitter<{ id : number, price:number ,numberOfP: number }>();
  @Input() product!: Product
  role! : string;
  numberOfP!: number;

  constructor(private alertify : AlertifyService,) { }

  ngOnInit() {
    this.role = localStorage.getItem('role')!
  }

  onAddProduct() {
    if(this.numberOfP > 0)
    this.numberOfProducts.emit({ id: this.product.id, price: this.product.price ,numberOfP: this.numberOfP});
    else {
      this.alertify.error('You cant order less than one product!');
    }
  }

}
