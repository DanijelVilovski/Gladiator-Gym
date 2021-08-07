import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { Course } from './course.model';


@Injectable({providedIn: 'root'})
export class CoursesService {
    private courses: Course[] = [];
    private coursesUpdated = new Subject<Course[]>();

    constructor(private http: HttpClient, private router: Router) {}

    getCourses() {
        this.http.get<{message: string, courses: Course[]}>('http://localhost:3000/api/courses')
        .subscribe((courseData) => {
            this.courses = courseData.courses;
            this.coursesUpdated.next([...this.courses]);
        });
    }

    getCourseUpdateListener() {
        return this.coursesUpdated.asObservable();
    }

    getCourse(id: String) {
        return this.http.get<{ _id: string, name: string, price: string, description: string, imagePath: string}>
        ("http://localhost:3000/api/courses/" + id); 
    }

    addCourse(name: string, price: string, description: string,  image: File) {
        const courseData = new FormData();
        courseData.append("name", name);
        courseData.append("price", price);
        courseData.append("description", description);
        courseData.append("image", image, name);
        this.http.post<{ message: string, course: Course }>("http://localhost:3000/api/courses", courseData)
        .subscribe((responseData) => {
            const course: Course = {
                _id: responseData.course._id, 
                name: name, 
                description: description, 
                price: price, 
                imagePath: responseData.course.imagePath
            };
            this.courses.push(course);
            this.coursesUpdated.next([...this.courses]);
            this.router.navigate(["/courses"]);
        });
    }

    updateCourse(id: string, name: string, price: string, description: string, image: any) {
        let courseData: Course | FormData;
        if (typeof(image) === 'object') {
            courseData = new FormData();
            courseData.append("_id", id);
            courseData.append("name", name);
            courseData.append("price", price);
            courseData.append("description", description);
            courseData.append("image", image, name);
        } else {
            courseData = { 
                _id: id, 
                name: name, 
                price: price, 
                description: description,
                imagePath: image 
            };
        }
        this.http.put("http://localhost:3000/api/courses/" + id, courseData)
            .subscribe(response => {
                const updatedCourses = [...this.courses];
                const oldCourseIndex = updatedCourses.findIndex(p => p._id === id); // id _id
                const course: Course = {
                    _id: id, 
                    name: name, 
                    price: price, 
                    description: description,
                    imagePath: ""     //response.imagePath
                }
                updatedCourses[oldCourseIndex] = course;
                this.courses = updatedCourses;
                this.coursesUpdated.next([...this.courses]);
                this.router.navigate(["/courses"]);
            });
    }

    deleteCourse(courseId: string) {
        this.http.delete("http://localhost:3000/api/courses/" + courseId)
          .subscribe(() => {
              const updatedCourses = this.courses.filter(course => course._id !== courseId);
              this.courses = updatedCourses;
              this.coursesUpdated.next([...this.courses]);
          })
    }
}

