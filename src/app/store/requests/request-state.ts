import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { of } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators'
import { RegisterRequest } from "src/app/model/user";
import { AlertifyService } from "src/app/services/alertify.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ApproveItemAction, ApproveItemFailed, ApproveOrRejectItemSuccess, FetchAllRegistrationRequestsFailed, FetchAllRegistrationRequestsSuccess, GetAllRegistrationRequestAction, RejectItemAction, RejectItemFailed } from "./request-actions";

export interface RequestStateModel {
  items: RegisterRequest[]
}

@State<RequestStateModel>({
  name: 'request',
  defaults: {
    items: []
  }
})
@Injectable()
export class RequestState {

  @Selector()
  static requestItems(state:RequestStateModel){
    return state.items
  }

  constructor(private authService:AuthenticationService,
              private alertify:AlertifyService) { }

  @Action(GetAllRegistrationRequestAction)
  fetchAllRegistrationRequests(ctx: StateContext<RequestStateModel>){

    return this.authService.getAllRegistrationRequest().pipe(
      map((items :RegisterRequest []) => {
        return ctx.dispatch(new FetchAllRegistrationRequestsSuccess(items))
      }),
      catchError((error) => {
        return of(
          ctx.dispatch(new FetchAllRegistrationRequestsFailed(error))
        )
      })
    )

  }

  @Action(FetchAllRegistrationRequestsSuccess)
  fetchAllRegistrationRequestsSuccess(ctx: StateContext<RequestStateModel>, action: FetchAllRegistrationRequestsSuccess) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      items: action.registrationList,
    });
  }

  @Action(ApproveItemAction)
  approveItem(ctx: StateContext<RequestStateModel>, action: ApproveItemAction){
    return this.authService.registerUser(action.registerRequest).pipe(
      map(() => {
        this.alertify.success('User successfully registered');
        return ctx.dispatch(new ApproveOrRejectItemSuccess(action.registerRequest.id));
      }),
      catchError((error) => {
        return of(ctx.dispatch(new ApproveItemFailed(error))
      )
      })
    );
  }

  @Action(RejectItemAction)
  rejectItem(ctx: StateContext<RequestStateModel>,action: RejectItemAction){
    return this.authService.rejectRegisterRequest(action.itemId).pipe(
      map(() => {
        this.alertify.success('User succesuful rejected');
        return ctx.dispatch(new ApproveOrRejectItemSuccess(action.itemId));
      }),
      catchError((error) => {
        return of(ctx.dispatch(new RejectItemFailed(error))
      )
      })
    );
  }

  @Action(ApproveOrRejectItemSuccess)
  approveItemSuccess(ctx: StateContext<RequestStateModel>, action : ApproveOrRejectItemSuccess){
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      items: state.items.filter(item => item.id !== action.itemId)
    });
  }

}
