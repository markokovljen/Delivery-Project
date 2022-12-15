import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OrderResponseDto } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';
import { GetCurrentHistoryOrdersDelivererAction } from 'src/app/store/orders/order-actions';
import { OrderState } from 'src/app/store/orders/order-state';

@Component({
  selector: 'app-current-order-deliverer',
  templateUrl: './current-order-deliverer.component.html',
  styleUrls: ['./current-order-deliverer.component.scss']
})
export class CurrentOrderDelivererComponent implements OnInit {

  @Select(OrderState.orderCurrentHistoryItemsDeliverer) orderItemsDeliverer$!: Observable<OrderResponseDto []>;

  constructor(private orderService : OrderService,
              private store: Store) { }

  ngOnInit() {
    let delivererId = +localStorage.getItem('id')!
    this.orderService.updateCurrentOrderDeliverer(delivererId).subscribe(()=>{
       this.store.dispatch(new GetCurrentHistoryOrdersDelivererAction(delivererId))
    })

  }

  handleEvent(event: any){

  }

}
