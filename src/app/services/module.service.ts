import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseUrlService } from './base-url.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  getModuleById(modID: any) {
    throw new Error('Method not implemented.');
  }
  selectedModule = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient,
    private baseUrlService: BaseUrlService,) {}

  uploadModules(courseID: string, file: File) {
    const formData = new FormData();
    formData.append('courseID', courseID);
    formData.append('file', file, file.name);
console.log(formData);
    return this.http.post(`${this.baseUrlService.baseUrl}/api/addModule`, formData);
  }

  getAllModules() {
    return  this.http
    .get(`${this.baseUrlService.baseUrl}/api/modules`);
  }

  getModules(uniID: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/unimodules?uniID=${uniID}`);
  }

}
