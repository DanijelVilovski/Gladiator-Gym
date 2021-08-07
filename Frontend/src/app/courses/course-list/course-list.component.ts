import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { Course } from '../course.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy {

   courses: Course[] = [];
   isLoading = false;
   userIsAuthenticated = false;
    userIsAdmin = false;
   private coursesSub: Subscription = new Subscription;
   private authStatusSub!: Subscription;
  private isAdminListenerSubs!: Subscription;


   constructor(public coursesService : CoursesService, private authService: AuthService, private router: Router) { }
    
   ngOnInit(): void {
     this.coursesService.getCourses();
     this.coursesSub = this.coursesService.getCourseUpdateListener()
     .subscribe((courses: Course[]) => {
       this.courses = courses;
     });
     this.userIsAuthenticated = this.authService.getIsAuth();
     this.authStatusSub = this.authService.getAuthStatusListener()
     .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
     });
     if (localStorage.getItem('isAdmin') == 'true')
     {
       this.userIsAdmin = true;
     }
     this.isAdminListenerSubs = this.authService
     .getIsAdminListener()
     .subscribe(isAdmin => {
       this.userIsAdmin = isAdmin;
     });  
   }

   onDelete(courseId: string) {
     this.coursesService.deleteCourse(courseId);
   }

   onBuy(name: string, price: string) {
    localStorage.setItem("nazivKursa", name);
    localStorage.setItem("cenaKursa", price);
    this.router.navigate(["/order-details"]);
   }

   ngOnDestroy() {
     this.coursesSub.unsubscribe();
     this.authStatusSub.unsubscribe();
     this.isAdminListenerSubs.unsubscribe();
   }

}
