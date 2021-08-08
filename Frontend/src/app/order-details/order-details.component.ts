import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { OrderService } from './order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  alert = false;

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
  }

  order(form: NgForm) {
    if (form.invalid)
      return;
    this.orderService.orderDetails(form.value.name, form.value.phone);
    this.alert = true;
    
  }

}
