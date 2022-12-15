import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddProductAction } from 'src/app/store/products/product-actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {
  }

  onAdd(addForm:NgForm){
    this.store.dispatch(new AddProductAction(addForm.value))
}

}
