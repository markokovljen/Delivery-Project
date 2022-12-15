import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OrderResponseDto } from 'src/app/model/order';
import { GetOrdersAdminAction } from 'src/app/store/orders/order-actions';
import { OrderState } from 'src/app/store/orders/order-state';

@Component({
  selector: 'app-current-order-admin',
  templateUrl: './current-order-admin.component.html',
  styleUrls: ['./current-order-admin.component.scss']
})
export class CurrentOrderAdminComponent implements OnInit {

  @Select(OrderState.orderItemsAdmin) orderItemsAdmin$!: Observable<OrderResponseDto []>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetOrdersAdminAction())

  }

}
