import { RegisterRequest } from "src/app/model/user";


export class GetAllRegistrationRequestAction {
  static readonly type = '[REQUEST page] Get all registration request'
}

export class FetchAllRegistrationRequestsSuccess {
  static readonly type = "[REQUEST page] Fetch All Registration Requests Success";
  constructor(public registrationList: RegisterRequest []) {}
}

export class FetchAllRegistrationRequestsFailed {
  static readonly type = "[REQUEST page] Fetch All Registration Requests Failed";
  constructor(public error: any ) {}
}

export class ApproveItemAction {
  static readonly type = '[REQUEST page] Approve item'
  constructor(public registerRequest : RegisterRequest){
  }
}

export class ApproveOrRejectItemSuccess {
  static readonly type = "[REQUEST page] Approve item Success";
  constructor(public itemId: number) {}
}

export class ApproveItemFailed {
  static readonly type = "[REQUEST page] Approve item Failed";
  constructor(public error: any ) {}
}

export class RejectItemAction {
  static readonly type = '[REQUEST page] Reject item'
  constructor(public itemId: number){
  }
}

export class RejectItemFailed {
  static readonly type = "[REQUEST page] Reject item Failed";
  constructor(public error: any ) {}
}


