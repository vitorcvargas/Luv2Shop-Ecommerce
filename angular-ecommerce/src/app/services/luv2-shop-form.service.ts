import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../common/state';
import { CEP } from '../common/cep';
import { City } from '../common/city';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  localitiesBaseUrl: string = "https://servicodados.ibge.gov.br/api/v1/localidades/";

  constructor(private httpClient: HttpClient) { }

  getCreditCardMonths(startMonth: number): Observable<number[]>{

    let data: number[] = [];

    for(let month = startMonth; month <= 12; month++){
      data.push(month);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]>{

    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for(let year = startYear; year <= endYear; year++){

      data.push(year);
    }

    return of(data);
  }

  getStates(): Observable<State[]>{

    let searchUrl: string = `${this.localitiesBaseUrl}estados`;

    return this.httpClient.get<State[]>(searchUrl);
  }

  getCities(uf: string): Observable<City[]>{

    let searchUrl: string = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`;

    return this.httpClient.get<City[]>(searchUrl);
  }

  getCEP(cep: string): Observable<CEP>{

    let searchUrl: string = `https://viacep.com.br/ws/${cep}/json/`;

    return this.httpClient.get<CEP>(searchUrl);
  }
  
}
