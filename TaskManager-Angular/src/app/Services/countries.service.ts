import { Injectable } from '@angular/core';
import { Country, CountryAdd } from '../Models/country';
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
  }
  
  getCountryByCountryID(CountryID: number): Observable<Country> {
    return this.httpclient.get<Country>(this.url + "/api/countries/searchbycountryid/" + CountryID, { responseType: "json" });
  }

  insertCountry(newCountry: CountryAdd): Observable<Country> {
    return this.httpclient.post<Country>(this.url + "/api/countries/", newCountry, { responseType: "json" });
  }

  updateCountry(existingCountry: CountryAdd): Observable<Country> {
    return this.httpclient.put<Country>(this.url + "/api/countries/", existingCountry, { responseType: "json" });
  }

  deleteCountry(CountryID: number | null): Observable<string> {
    return this.httpclient.delete<string>(this.url + "/api/countries?countryID=" + CountryID);
  }
}
