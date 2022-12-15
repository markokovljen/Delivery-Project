import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OrderResponseDto } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';
import { GetOrdersUserAction } from 'src/app/store/orders/order-actions';
import { OrderState } from 'src/app/store/orders/order-state';

@Component({
  selector: 'app-current-order-user',
  templateUrl: './current-order-user.component.html',
  styleUrls: ['./current-order-user.component.scss']
})
export class CurrentOrderUserComponent implements OnInit {

  @Select(OrderState.orderItemsUser) orderItemsUser$!: Observable<OrderResponseDto []>;

  constructor(private orderService : OrderService,
              private store: Store) { }

  ngOnInit() {
    let userId = +localStorage.getItem('id')!
    this.orderService.updateCurrentOrderUser(userId).subscribe(() => {
      this.store.dispatch(new GetOrdersUserAction(userId))
    })

  }

}
