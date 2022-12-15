import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { GetAllProductsAction } from 'src/app/store/products/product-actions';
import { ProductState } from 'src/app/store/products/product-state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Output() numberOfProducts = new EventEmitter<{ id : number,price:number , numberOfP: number }>();
  @Select(ProductState.productItems) productList$!: Observable<Product []>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetAllProductsAction())
  }

  onNumberOfProductsAdded(eventData: { id : number, price:number ,numberOfP: number  }){
    this.numberOfProducts.emit(eventData);
  }

}
