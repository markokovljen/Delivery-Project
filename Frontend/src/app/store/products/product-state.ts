import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Product } from "src/app/model/product";
import { AlertifyService } from "src/app/services/alertify.service";
import { ProductService } from "src/app/services/product.service";
import { AddProductAction, AddProductActionFailed, AddProductActionSuccess, FetchAllProductsFailed, FetchAllProductsSuccess, GetAllProductsAction } from "./product-actions";

export interface ProductStateModel {
  productItems: Product[]
}

@State<ProductStateModel>({
  name: 'product',
  defaults: {
    productItems: []
  }
})
@Injectable()
export class ProductState{

  @Selector()
  static productItems(state:ProductStateModel){
    return state.productItems
  }

  constructor(private productService:ProductService,
              private alertify:AlertifyService) { }

  @Action(GetAllProductsAction)
  fetchAllProducts(ctx: StateContext<ProductStateModel>){
    return this.productService.getAllProductes().pipe(
      map((items: Product []) => {
        return ctx.dispatch(new FetchAllProductsSuccess(items))
      }),
      catchError((error) => {
        return of(
          ctx.dispatch(new FetchAllProductsFailed(error))
        )
      })
    )
  }

  @Action(FetchAllProductsSuccess)
  fetchAllProductsSuccess(ctx: StateContext<ProductStateModel>, action: FetchAllProductsSuccess) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      productItems: action.products,
    });
  }

  @Action(AddProductAction)
  addProductAction(ctx: StateContext<ProductStateModel>, action: AddProductAction){
    return this.productService.addProduct(action.product).pipe(
      map(() => {
        this.alertify.success('Product succesufuly added');
        return ctx.dispatch(new AddProductActionSuccess(action.product));
      }),
      catchError((error) => {
        return of(ctx.dispatch(new AddProductActionFailed({ error: error })));
      })
    );
  }

  @Action(AddProductActionSuccess)
  addProductActionSuccess(ctx: StateContext<ProductStateModel>, action : AddProductActionSuccess){
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      productItems: state.productItems.concat(action.product)
    });
  }
}
