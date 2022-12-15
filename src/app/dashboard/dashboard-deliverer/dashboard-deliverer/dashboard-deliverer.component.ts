import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OrderResponseDto } from 'src/app/model/order';
import { GetPendingOrdersDelivererAction, TakeOrderAction } from 'src/app/store/orders/order-actions';
import { OrderState } from 'src/app/store/orders/order-state';

@Component({
  selector: 'app-dashboard-deliverer',
  templateUrl: './dashboard-deliverer.component.html',
  styleUrls: ['./dashboard-deliverer.component.scss']
})
export class DashboardDelivererComponent implements OnInit {

  @Select(OrderState.orderPendingItemsDeliverer) orderPendingItemsDeliverer$!: Observable<OrderResponseDto []>;
  delivererId! : number

  constructor(private store: Store) { }

  ngOnInit() {
    this.delivererId = +localStorage.getItem('id')!
    this.store.dispatch(new GetPendingOrdersDelivererAction(this.delivererId))
  }

  onTakeOrder(orderId: number){
    this.store.dispatch(new TakeOrderAction(this.delivererId,orderId))

  }

}
