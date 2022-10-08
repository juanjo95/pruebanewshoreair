import { Component, OnInit } from '@angular/core';
import { FlightApi } from 'src/app/models/flightapi.model';
import { ApiService } from '../../services/api.service';
import { Flight } from '../../models/flight.class';
import { Transport } from 'src/app/models/transport.class';

@Component({
  selector: 'app-lists-flights',
  templateUrl: './lists-flights.component.html',
  styleUrls: ['./lists-flights.component.css']
})
export class ListsFlightsComponent implements OnInit {

  public flights:Flight[] = [];

  constructor(private apiService:ApiService) { }

  ngOnInit() {
    this.apiService.getFlights().subscribe((res:FlightApi[]) => {
      for (let i = 0; i < res.length; i++) {
        let transport = new Transport(res[i].flightCarrier,res[i].flightNumber);
        let flight = new Flight(transport,res[i].departureStation,res[i].arrivalStation,res[i].price);
        this.flights.push(flight);
      }
      console.log(this.flights);
    });
  }
}
