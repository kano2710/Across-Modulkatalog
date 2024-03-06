import { Injectable } from '@angular/core';
import { University } from '../model/university.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversityListService {
  private universities: University[] = [
    {
      id: 1,
      name: 'Bialystok University of Technology',
      location: 'Poland',
      imageUrl: 'assets/bialystok.jpg',
      website: 'https://pb.edu.pl/',
    },
    {
      id: 2,
      name: 'Chemnitz University of Technology',
      location: 'Germany',
      imageUrl: 'assets/tuc.jpg',
      website: 'https://www.tu-chemnitz.de/index.html.en',
    },
    {
      id: 3,
      name: 'University of Craiova',
      location: 'Romania',
      imageUrl: 'assets/Craiova.jpg',
      website: 'https://www.ucv.ro/en/',
    },
    {
      id: 4,
      name: 'University of Girona',
      location: 'Spain',
      imageUrl: 'assets/Girona.jpg',
      website: 'https://www.udg.edu/ca/',
    },
    {
      id: 5,
      name: 'University of Banja Luka',
      location: 'Bosnia and Herzegovina',
      imageUrl: 'assets/Banja Luka.jpg',
      website: 'https://www.unibl.org/en',
    },
    {
      id: 6,
      name: 'University of Nova Gorica',
      location: 'Slovenia',
      imageUrl: 'assets/Gorica.jpg',
      website: 'https://www.ung.si/sl/',
    },
    {
      id: 7,
      name: 'University of Perpignan',
      location: 'France',
      imageUrl: 'assets/Perpignan.jpg',
      website: 'https://www.ung.si/sl/',
    },
    {
      id: 8,
      name: 'University of Ruse',
      location: 'Bulgaria',
      imageUrl: 'assets/Ruse.png',
      website: 'https://www.ung.si/sl/',
    },
    {
      id: 9,
      name: 'University of Udine',
      location: 'Italy',
      imageUrl: 'assets/Udine.jpg',
      website: 'https://www.ung.si/sl/',
    },
    // Add more universities as needed
  ];

  getUniversities(): Observable<University[]> {
    return of(this.universities);
  }
}
