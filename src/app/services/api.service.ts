import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightApi } from '../models/flightapi.model';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url:string = `${environment.API_URL}/api/flights/2`;

  constructor(private http: HttpClient) { }

  getFlights() {
    return this.http.get<FlightApi[]>(this.url)
      .pipe(
        retry(3)
      );
  }

}
