import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientLocation } from '../Models/client-location';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientLocationService {

  urlPrefix: string = "https://localhost:7018"//make this as empty ("") if you are using asp.net core [without CORS]

  constructor(private httpClient: HttpClient)
  {
  }

  getClientLocations(): Observable<ClientLocation[]>
  {
    return this.httpClient.get<ClientLocation[]>(this.urlPrefix + "/api/ClientLocations/api/clientlocations", { responseType: "json" });
  }
}
