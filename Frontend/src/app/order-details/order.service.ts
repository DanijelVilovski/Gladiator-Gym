import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Order } from './order.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  private ordersUpdated = new Subject<Order[]>();

  constructor(private http: HttpClient) { }

  orderDetails(name: string, phone: string) {
    const course = localStorage.getItem("nazivKursa") || "{}";
    const price = localStorage.getItem("cenaKursa") || "{}";
    const orderData: Order = {name: name, phone: phone, course: course, price: price};
    this.http.post("http://localhost:3000/api/orders/sendOrder", orderData)
    .subscribe(() => {
    }, error => {
      console.log(error);
    });
  }

  getOrderUpdateListener() {
    return this.ordersUpdated.asObservable();
}

  getOrders() {
    this.http.get<{message: string, orders: Order[]}>('http://localhost:3000/api/orders/getOrders')
        .subscribe((orderData) => {
            this.orders = orderData.orders;
            this.ordersUpdated.next([...this.orders]);
        });
  }
}
