import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlService } from './base-url.service';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  constructor(private http: HttpClient,
    private baseUrlService: BaseUrlService, private router:Router) { }

    getUniversityDetails(uniId: string): Observable<any> {
      const url = `${this.baseUrlService.baseUrl}/${uniId}`;
  
      return this.http.get<any>(url).pipe(
        catchError((error) => {
          console.error('Error fetching university details:', error);
          return throwError('An error occurred while fetching university details.');
        })
      );
    }
}
