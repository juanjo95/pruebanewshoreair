import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../../services/api.service';
import { FlightApi } from '../../models/flightapi.model';
import { Flight } from '../../models/flight.class';
import { Transport } from '../../models/transport.class';
import { Journey } from '../../models/journey.class';
import { CurrencyService } from '../../services/currency.service';
import { Currency } from 'src/app/models/currency.model';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {

  myForm!:FormGroup
  expressionValid = /^[a-zA-Z]+$/;
  origin:string = "";
  destination:string = "";
  currencies:string[] = ["USD","EUR","COP"];
  opcionSeleccionada:number = 0;
  opcionActual:number = 0;
  precioOriginalUsd = 0;
  currency_back = 0;

  flights:FlightApi[] = [];
  flights_journey:Flight[] = [];
  journey!:Journey;

  constructor(private fb: FormBuilder, private apiService:ApiService, private apiCurrency:CurrencyService) {
    this.buildForm();
  }

  private buildForm(){
    this.myForm = this.fb.group({
      origin: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(3),Validators.pattern(this.expressionValid)]],
      destination: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(3),Validators.pattern(this.expressionValid)]]
    },
    {
      validators: [this.compararInputs]
    }
    );
  }

  ngOnInit(): void {
    this.apiService.getFlights().subscribe((res:FlightApi[]) => {
        this.flights = res;
    });
  }

  search():void{
    if(this.myForm.valid){
      this.origin = this.myForm.value.origin.toUpperCase();
      this.destination = this.myForm.value.destination.toUpperCase();
      this.flights_journey = [];

      this.apiService.getFlights().subscribe((res:FlightApi[]) => {
          this.flights = res;
          let direct = false;
          this.flights = this.flights.filter(flight => flight.departureStation.includes(this.origin));
          if(this.flights.length > 0){
            for (let i = 0; i < this.flights.length; i++) {
              if(this.flights[i].arrivalStation == this.destination){
                direct = true;
                let newTransport = new Transport(this.flights[i].flightCarrier,this.flights[i].flightNumber);
                let newFligth = new Flight(newTransport,this.flights[i].departureStation,this.flights[i].arrivalStation,this.flights[i].price);
                this.flights_journey.push(newFligth);
                this.journey = new Journey(this.flights_journey,this.flights[i].departureStation,this.flights[i].arrivalStation,this.flights[i].price);
                this.precioOriginalUsd = this.journey.price;
                break;
              }else{
                continue;
              }
            }

            if(!direct){
              let found = false;
              for (let j = 0; j < this.flights.length; j++) {
                if(found){
                  break;
                }
                let flights2 = res;
                flights2 = flights2.filter(flight => flight.departureStation.includes(this.flights[j].arrivalStation));
                if(flights2.length > 0){
                  for (let k = 0; k < flights2.length; k++) {
                    if(flights2[k].arrivalStation == this.destination){
                      found = true;
                      let newTransport = new Transport(this.flights[j].flightCarrier,this.flights[j].flightNumber);
                      let newFligth = new Flight(newTransport,this.flights[j].departureStation,this.flights[j].arrivalStation,this.flights[j].price);
                      this.flights_journey.push(newFligth);

                      newTransport = new Transport(flights2[k].flightCarrier,flights2[k].flightNumber);
                      newFligth = new Flight(newTransport,flights2[k].departureStation,flights2[k].arrivalStation,flights2[k].price);
                      this.flights_journey.push(newFligth);

                      this.journey = new Journey(this.flights_journey,this.flights[j].departureStation,flights2[k].arrivalStation,(this.flights[j].price+flights2[k].price));
                      this.precioOriginalUsd = this.journey.price;
                      break;
                    }else{
                      let flights3 = res;
                      flights3 = flights3.filter(flight => flight.departureStation.includes(flights2[k].arrivalStation));
                      if(flights3.length > 0){
                        for (let h = 0; h < flights3.length; h++) {
                          if(flights3[h].arrivalStation == this.destination){
                            found = true;
                            let newTransport = new Transport(this.flights[j].flightCarrier,this.flights[j].flightNumber);
                            let newFligth = new Flight(newTransport,this.flights[j].departureStation,this.flights[j].arrivalStation,this.flights[j].price);
                            this.flights_journey.push(newFligth);

                            newTransport = new Transport(flights2[k].flightCarrier,flights2[k].flightNumber);
                            newFligth = new Flight(newTransport,flights2[k].departureStation,flights2[k].arrivalStation,flights2[k].price);
                            this.flights_journey.push(newFligth);

                            newTransport = new Transport(flights3[h].flightCarrier,flights3[h].flightNumber);
                            newFligth = new Flight(newTransport,flights3[h].departureStation,flights3[h].arrivalStation,flights3[h].price);
                            this.flights_journey.push(newFligth);

                            this.journey = new Journey(this.flights_journey,this.flights[j].departureStation,flights3[h].arrivalStation,(this.flights[j].price+flights2[k].price+flights3[h].price));
                            this.precioOriginalUsd = this.journey.price;
                            break;
                          }
                        }
                      }
                    }
                  }
                }
              }
              if(!found){
                  Swal.fire(
                    'There is no connection to the final destination',
                    'Try another search!',
                    'error'
                  );
              }
            }
          }else{
            Swal.fire(
              'There is no flight that has this origin',
              'Check your origin again.!',
              'error'
            );
          }
      });


    }else{
      Swal.fire(
        'The form was not correct',
        'Invalid form!',
        'error'
      );
    }
  }

  private compararInputs(control:AbstractControl){
    const origin = control.get('origin')?.value;
    const destination = control.get('destination')?.value;

    if ((origin != destination) || (origin == "" && destination == "")) {
        return null;
    }else{
      return {origindestinationequals: true}
    }
  }

  public viewFlights(){
    let rows:string = "";

    for (let z = 0; z < this.journey.flights.length; z++) {
      rows +=`<tr>
                <th scope="row">${z + 1 }</th>
                <td>${ this.journey.flights[z].origin }</td>
                <td>${ this.journey.flights[z].destination }</td>
                <td>${ this.journey.flights[z].transport.flightCarrier }</td>
                <td>${ this.journey.flights[z].transport.flightNumber }</td>
                <td>$${ this.journey.flights[z].price }</td>
              </tr>`
    };

    let html_flights = `<table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Origin</th>
                            <th scope="col">Destination</th>
                            <th scope="col">Flight Carrier</th>
                            <th scope="col">Flight Number</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>`;

    Swal.fire({
      title: '<strong>Details flights</strong>',
      icon: 'info',
      scrollbarPadding: true,
      html:html_flights,
      width: 1000,
      showCloseButton: true,
      focusConfirm: false
    })
  }

  public changeCurrency(event:any){
    if(this.currencies[this.opcionSeleccionada] == "USD"){
      this.currency_back = 0;
      this.journey.price = this.precioOriginalUsd;
    }else{
      this.apiCurrency.getChangeCurrency(this.currencies[this.opcionSeleccionada],this.currencies[this.currency_back],this.journey.price).subscribe((data:Currency) => {
        this.currency_back = this.opcionSeleccionada;
        this.journey.price = data.result;
      });
    }
  }
}
