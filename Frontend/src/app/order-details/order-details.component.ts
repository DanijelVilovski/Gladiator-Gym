import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { ElementSchemaRegistry } from '@angular/compiler';
import { HttpClient } from "@angular/common/http";

import { OrderService } from './order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  alert = false;

  constructor(private orderService: OrderService,
    private fb: FormBuilder, private stripeService: StripeService,
    private http: HttpClient) { }

    @ViewChild(StripeCardComponent) card: StripeCardComponent | undefined;

    cardOptions: StripeCardElementOptions = {
      style: {
        base: {
          iconColor: 'black',
          color: '#31325F',
          fontWeight: '300',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSize: '18px',
          '::placeholder': {
            color: 'black'
          }
        }
      },
      hidePostalCode: true
    };
  
    elementsOptions: StripeElementsOptions = {
      locale: 'es'
    };
  
    stripeTest!: FormGroup;  

    ngOnInit(): void {
      this.stripeTest = this.fb.group({
        name: ['', [Validators.required]]
      });
    }

  order(form: NgForm) {
    if (form.invalid)
      return;
    this.orderService.orderDetails(form.value.name, form.value.phone);
    const price = localStorage.getItem("cenaKursa") || ' ';
    const name = form.value.name;
    this.stripeService
      .createToken(this.card!.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
          this.http.post("http://localhost:3000/payment", {
            token: result.token.id,
            price: price
          }).subscribe(
            (res) => {
              console.log(res);
              console.log("Payment done!");
            },
            (err) => {
              console.log('Error ' + err.message);
            }
          )
        } else if (result.error) {
          // Error creating the token
          console.log('Error ' + result.error.message);
        }
      });
    this.alert = true;
  }

}
