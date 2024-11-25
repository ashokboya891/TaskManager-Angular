import { Injectable } from '@angular/core';
import { Country } from '../Models/country';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  url:string="https://localhost:7018/api/Countries";
  constructor(private httpclient:HttpClient)
  {
  }

  getCountries(): Observable<Country[]>
  {
    return this.httpclient.get<Country[]>(this.url+"/api/Countries",{responseType:'json'})
    // return [
    //   new Country(1, "India"),
    //   new Country(2, "UK"),
    //   new Country(3, "USA"),
    //   new Country(4, "Japan")
    // ];
  }
}
