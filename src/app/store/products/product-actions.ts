import { Product } from "src/app/model/product";

export class GetAllProductsAction {
  static readonly type = '[DASHBOARD page] Get all products'
}
export class FetchAllProductsSuccess {
  static readonly type = "[DASHBOARD page] Fetch All Products Success";
  constructor(public products: Product []) {}
}
export class FetchAllProductsFailed {
  static readonly type = "[DASHBOARD page] Fetch All Products Failed";
  constructor(public error: any ) {}
}
export class AddProductAction {
  static readonly type = '[DASHBOARD page] Add product'
  constructor(public product: Product) {}
}
export class AddProductActionSuccess {
  static readonly type = '[DASHBOARD page] Add product Success'
  constructor(public product: Product) {}
}
export class AddProductActionFailed {
  static readonly type = "[DASHBOARD page] Add product Failed";
  constructor(public error: any ) {}
}

