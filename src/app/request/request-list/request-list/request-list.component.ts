import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RegisterRequest } from 'src/app/model/user';

import { GetAllRegistrationRequestAction } from 'src/app/store/requests/request-actions';
import { RequestState } from 'src/app/store/requests/request-state';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {

  @Select(RequestState.requestItems) registrationList$!: Observable<RegisterRequest []>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetAllRegistrationRequestAction())

  }

}
