import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../must-match.validator';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub!: Subscription;
  registerForm!: FormGroup;
  submitted = false;

  constructor(public authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
    });
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.isLoading = true;
    this.authService.createUser(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.fullName);
  }
  
  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

}
