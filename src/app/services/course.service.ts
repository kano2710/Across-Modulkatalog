// Import necessary modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrlService } from './base-url.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = this.baseUrlService.baseUrl;
  constructor(private http: HttpClient, private baseUrlService:BaseUrlService) {}


  addCourse(courseData: any) {
    console.log("coursedata:"+courseData);

  }

  uploadModuleFile(file: File){
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    console.log("file:"+formData);
 //   return this.http.post(`${this.apiUrl}/upload-module-file`, formData);
  }


  getCourses(uniID: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/courses/${uniID}`);
  }

  deleteCourse(courseId: any) {
    return this.http.delete(`${this.baseUrl}/api/deleteCourse/${courseId}`);
  }

}
