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
    return this.httpClient.get<ClientLocation[]>(this.urlPrefix + "/api/ClientLocations", { responseType: "json" });
  }
  getClientLocationtByClientLocationID(ClientLocationID: number): Observable<ClientLocation> {
    return this.httpClient.get<ClientLocation>(this.urlPrefix + "/api/clientlocations/searchbyclientlocationid/" + ClientLocationID, { responseType: "json" });
  }

  insertClientLocation(newClientLocation: ClientLocation): Observable<ClientLocation> {
    return this.httpClient.post<ClientLocation>(this.urlPrefix + "/api/clientlocations", newClientLocation, { responseType: "json" });
  }

  updateClientLocation(existingClientLocation: ClientLocation): Observable<ClientLocation> {
    return this.httpClient.put<ClientLocation>(this.urlPrefix + "/api/clientlocations", existingClientLocation, { responseType: "json" });
  }

  deleteClientLocation(ClientLocationID: number): Observable<string> {
    return this.httpClient.delete<string>(this.urlPrefix + "/api/clientlocations?ClientLocationID=" + ClientLocationID);
  }

}
