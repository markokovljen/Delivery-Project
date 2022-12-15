import { Order, OrderResponseDto } from "src/app/model/order";

export class GetOrdersAdminAction {
  static readonly type = '[DASHBOARD ADMIN page] Get all orders admin'
}
export class FetchAllOrdersAdminSuccess {
  static readonly type = "[DASHBOARD ADMIN page] Fetch All Orders Admin Success";
  constructor(public orders: OrderResponseDto []) {}
}
export class FetchAllOrdersAdminFailed {
  static readonly type = "[DASHBOARD ADMIN page] Fetch All Orders Admin Failed";
  constructor(public error: any ) {}
}
export class AddOrderAction {
  static readonly type = '[DASHBOARD USER page] Add order'
  constructor(public order: Order) {}
}
export class AddOrderActionSuccess {
  static readonly type = '[DASHBOARD USER page] Add order Success'
}
export class AddOrderActionFailed {
  static readonly type = "[DASHBOARD USER page] Add order Failed";
  constructor(public error: any ) {}
}
export class GetOrdersUserAction {
  static readonly type = '[DASHBOARD USER page] Get all orders user'
  constructor (public userId: number){}
}
export class FetchAllOrdersUserSuccess {
  static readonly type = "[DASHBOARD USER page] Fetch All Orders User Success";
  constructor(public orders: OrderResponseDto []) {}
}
export class FetchAllOrdersUserFailed {
  static readonly type = "[DASHBOARD USER page] Fetch All Orders User Failed";
  constructor(public error: any ) {}
}
export class GetCurrentHistoryOrdersDelivererAction {
  static readonly type = '[DASHBOARD DELIVERER page] Get all orders deliverer'
  constructor (public delivererId: number){}
}
export class FetchAllCurrentHistoryOrdersDelivererSuccess {
  static readonly type = "[DASHBOARD DELIVERER page] Fetch All Orders Deliverer Success";
  constructor(public orders: OrderResponseDto []) {}
}
export class FetchAllCurrentHistoryOrdersDelivererFailed {
  static readonly type = "[DASHBOARD DELIVERER page] Fetch All Orders Deliverer Failed";
  constructor(public error: any ) {}
}
export class GetPendingOrdersDelivererAction {
  static readonly type = '[DASHBOARD DELIVERER page] Get all ending orders deliverer'
  constructor (public delivererId: number){}
}
export class FetchAllPendingOrdersDelivererSuccess {
  static readonly type = "[DASHBOARD DELIVERER page] Fetch All Pending Orders Deliverer Success";
  constructor(public orders: OrderResponseDto []) {}
}
export class FetchAllPendingOrdersDelivererFailed {
  static readonly type = "[DASHBOARD DELIVERER page] Fetch All Pending Orders Deliverer Failed";
  constructor(public error: any ) {}
}
export class TakeOrderAction {
  static readonly type = '[DASHBOARD DELIVERER page] Take order'
  constructor(public delivererId: number, public orderId: number) {}
}
export class TakeOrderActionSuccess {
  static readonly type = '[DASHBOARD DELIVERER page] Take order Success'
  constructor(public orderId: number) {}
}
export class TakerderActionFailed {
  static readonly type = "[DASHBOARD DELIVERER page] Take order Failed";
  constructor(public error: any ) {}
}

