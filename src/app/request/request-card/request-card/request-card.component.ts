import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RegisterRequest} from 'src/app/model/user';
import { ApproveItemAction, RejectItemAction } from 'src/app/store/requests/request-actions';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent implements OnInit {

  @Input() registrationRequest!: RegisterRequest

  constructor(private store:Store) { }

  ngOnInit() {
  }

  onApprove(){
    let user = {} as RegisterRequest
    user.userName=this.registrationRequest.userName
    user.firstName = this.registrationRequest.firstName
    user.lastName = this.registrationRequest.lastName
    user.email = this.registrationRequest.email
    user.password = this.registrationRequest.password
    user.confirmPassword = this.registrationRequest.password
    user.address = this.registrationRequest.address
    user.dateOfBirth = this.registrationRequest.dateOfBirth
    user.role = this.registrationRequest.role
    user.id = this.registrationRequest.id

    this.store.dispatch(new ApproveItemAction(user))
  }

  onReject(){
    this.store.dispatch(new RejectItemAction(this.registrationRequest.id))

  }

}
