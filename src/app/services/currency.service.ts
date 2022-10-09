import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private url:string = environment.API_CURRENCY;

  constructor(private http: HttpClient) { }

  getChangeCurrency(to:string, from:string, amount:number){
    const httpOptions = {
      headers: { 'apikey': environment.APIKEY_CURRENCY },
      params: {'to': to, 'from': from, 'amount': amount}
    };
    return this.http.get<Currency>(this.url, httpOptions);
  }
}
