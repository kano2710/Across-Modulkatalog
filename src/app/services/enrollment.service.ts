import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrollmentStepSource = new BehaviorSubject<number>(1); // Default to step 1
  currentStep = this.enrollmentStepSource.asObservable();

  constructor(private http: HttpClient) {}

  private getInitialStep(): number {
    const step = localStorage.getItem('enrollmentStep');
    return step ? parseInt(step, 10) : 1;
  }

  updateEnrollmentStep(step: number) {
    console.log(`Updating step to ${step}`);
    this.enrollmentStepSource.next(step);
    localStorage.setItem('enrollmentStep', step.toString());
   
  }
}
