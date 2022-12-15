import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Order, OrderResponseDto } from "src/app/model/order";
import { AlertifyService } from "src/app/services/alertify.service";
import { OrderService } from "src/app/services/order.service";
import { AddOrderAction, AddOrderActionFailed, AddOrderActionSuccess, FetchAllOrdersAdminFailed, FetchAllOrdersAdminSuccess, FetchAllCurrentHistoryOrdersDelivererFailed, FetchAllCurrentHistoryOrdersDelivererSuccess, FetchAllOrdersUserFailed, FetchAllOrdersUserSuccess, GetOrdersAdminAction, GetCurrentHistoryOrdersDelivererAction, GetOrdersUserAction, GetPendingOrdersDelivererAction, FetchAllPendingOrdersDelivererSuccess, FetchAllPendingOrdersDelivererFailed, TakeOrderAction, TakeOrderActionSuccess, TakerderActionFailed } from "./order-actions";

export interface OrderStateModel {
  orderItemsAdmin: OrderResponseDto[],
  orderItemsUser: OrderResponseDto[],
  orderCurrentHistoryItemsDeliverer: OrderResponseDto[],
  orderPendingItemsDeliverer: OrderResponseDto[],
}

@State<OrderStateModel>({
  name: 'order',
  defaults: {
    orderItemsAdmin: [],
    orderItemsUser: [],
    orderCurrentHistoryItemsDeliverer: [],
    orderPendingItemsDeliverer: []
  }
})
@Injectable()
export class OrderState{

  @Selector()
  static orderItemsAdmin(state:OrderStateModel){
    return state.orderItemsAdmin
  }

  @Selector()
  static orderItemsUser(state:OrderStateModel){
    return state.orderItemsUser
  }

  @Selector()
  static orderCurrentHistoryItemsDeliverer(state:OrderStateModel){
    return state.orderCurrentHistoryItemsDeliverer
  }
  @Selector()
  static orderPendingItemsDeliverer(state:OrderStateModel){
    return state.orderPendingItemsDeliverer
  }

  constructor(private orderService : OrderService,
              private alertify : AlertifyService,
              private router:Router) {}

  @Action(GetOrdersAdminAction)
  fetchAllOrdersAdmin(ctx: StateContext<OrderStateModel>){
    return this.orderService.getOrdersForAdmin().pipe(
      map((items: OrderResponseDto []) => {
        return ctx.dispatch(new FetchAllOrdersAdminSuccess(items))
      }),
      catchError((error) => {
        return of(
          ctx.dispatch(new FetchAllOrdersAdminFailed(error))
        )
      })
    )
  }

  @Action(FetchAllOrdersAdminSuccess)
  fetchAllOrdersAdminSuccess(ctx: StateContext<OrderStateModel>, action: FetchAllOrdersAdminSuccess) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      orderItemsAdmin: action.orders,
    });
  }

  @Action(AddOrderAction)
  addOrderAction(ctx: StateContext<OrderStateModel>, action: AddOrderAction){
    return this.orderService.addOrder(action.order).pipe(
      map(() => {
        this.alertify.success('Congrats, you are successfully make your order!');
        return ctx.dispatch(new AddOrderActionSuccess());
      }),
      catchError((error) => {
        return of(ctx.dispatch(new AddOrderActionFailed({ error: error })));
      })
    );
  }

  @Action(AddOrderActionSuccess)
  addOrderActionSuccess(){
    this.router.navigate(['/dashboard/user/currentorders']);
  }

  @Action(GetOrdersUserAction)
  fetchAllOrdersUser(ctx: StateContext<OrderStateModel>, action: GetOrdersUserAction){
    return this.orderService.getCurrentOrdersForUser(action.userId).pipe(
      map((items: OrderResponseDto []) => {

        this.calculateTime(items)
        return ctx.dispatch(new FetchAllOrdersUserSuccess(items))

      }),
      catchError((error) => {
        return of(
          ctx.dispatch(new FetchAllOrdersUserFailed(error))
        )
      })
    )
  }

  @Action(FetchAllOrdersUserSuccess)
  fetchAllOrdersUserSuccess(ctx: StateContext<OrderStateModel>, action: FetchAllOrdersUserSuccess) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      orderItemsUser: action.orders,
    });
  }

  @Action(GetCurrentHistoryOrdersDelivererAction)
  fetchAllOrdersDeliverer(ctx: StateContext<OrderStateModel>, action: GetCurrentHistoryOrdersDelivererAction){
    return this.orderService.getCurrentOrdersForDeliverer(action.delivererId).pipe(
      map((items: OrderResponseDto []) => {

        this.calculateTime(items)
        return ctx.dispatch(new FetchAllCurrentHistoryOrdersDelivererSuccess(items))

      }),
      catchError((error) => {
        return of(
          ctx.dispatch(new FetchAllCurrentHistoryOrdersDelivererFailed(error))
        )
      })
    )
  }

  @Action(FetchAllCurrentHistoryOrdersDelivererSuccess)
  fetchAllOrdersDelivererSuccess(ctx: StateContext<OrderStateModel>, action: FetchAllCurrentHistoryOrdersDelivererSuccess) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      orderCurrentHistoryItemsDeliverer: action.orders,
    });
  }

  calculateTime(items: OrderResponseDto []){
    for(let order of items){
      if(order.status == 'Finished'){
        order.deliveryTime2 = 0
      }else {
        var time = new Date();
        var endTime = new Date(order.deliveryTime);
        order.deliveryTime2 = Math.ceil(Math.abs(time.getTime()- endTime.getTime()) / 36e5*60);
      }
    }
  }

  @Action(GetPendingOrdersDelivererAction)
  fetchAllPendingOrdersDelivererAction(ctx: StateContext<OrderStateModel>, action: GetPendingOrdersDelivererAction){
    return this.orderService.getPendingDelivererOrders(action.delivererId).pipe(
      map((items: OrderResponseDto []) => {
        return ctx.dispatch(new FetchAllPendingOrdersDelivererSuccess(items))
      }),
      catchError((error) => {
        return of(
          ctx.dispatch(new FetchAllPendingOrdersDelivererFailed(error))
        )
      })
    )
  }

  @Action(FetchAllPendingOrdersDelivererSuccess)
  fetchAllPendingOrdersDelivererSuccess(ctx: StateContext<OrderStateModel>, action: FetchAllPendingOrdersDelivererSuccess) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      orderPendingItemsDeliverer: action.orders,
    });
  }

  @Action(TakeOrderAction)
  takeOrderAction(ctx: StateContext<OrderStateModel>, action: TakeOrderAction){
    return this.orderService.takeOrder(action.delivererId,action.orderId).pipe(
      map(() => {
        this.alertify.success('You succesful take order!')
        return ctx.dispatch(new TakeOrderActionSuccess(action.orderId));
      }),
      catchError((error) => {
        this.alertify.error('You already take an order!')
        return of(ctx.dispatch(new TakerderActionFailed({ error: error })));
      })
    );
  }

  @Action(TakeOrderActionSuccess)
  takeOrderActionSuccess(ctx: StateContext<OrderStateModel>, action : TakeOrderActionSuccess){
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      orderPendingItemsDeliverer: state.orderPendingItemsDeliverer.filter(item => item.id !== action.orderId)
    });
  }

}
