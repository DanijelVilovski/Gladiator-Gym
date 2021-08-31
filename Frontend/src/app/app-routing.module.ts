import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddUpdateCourseComponent } from './courses/add-update-course/add-update-course.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersComponent } from './orders/orders.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'create', component: AddUpdateCourseComponent, canActivate: [AuthGuard] },
  { path: 'edit/:courseId', component: AddUpdateCourseComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'order-details', component: OrderDetailsComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'about-us', component: AboutUsComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'users', component: UsersComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
