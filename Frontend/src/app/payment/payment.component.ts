import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { ElementSchemaRegistry } from '@angular/compiler';
import { HttpClient } from "@angular/common/http";



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private fb: FormBuilder, private stripeService: StripeService, private http: HttpClient) {}

  @ViewChild(StripeCardComponent) card: StripeCardComponent | undefined;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
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

  createToken(): void {
    const name = this.stripeTest!.get('name')!.value;
    this.stripeService
      .createToken(this.card!.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
          this.http.post("http://localhost:3000/payment", {
            token: result.token.id
          }).subscribe(
            (res )=> {
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

  }

}
