import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../order-details/order.service';
import { Order } from '../order-details/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  private ordersSub: Subscription = new Subscription;

  constructor(private ordersService: OrderService) { }

  ngOnInit(): void {
    this.ordersService.getOrders();
    this.ordersSub = this.ordersService.getOrderUpdateListener()
    .subscribe((orders: Order[]) => { 
      this.orders = orders;
    });
  }

  stringAsDate(dateStr: string) {
    return new Date(dateStr);
  }

  ngOnDestroy(): void {
    this.ordersSub.unsubscribe();
  }

}
