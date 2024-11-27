import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterLoggerService {

  private httpClient: HttpClient | any = null;
  currentUserName: string | null = null;
  private urlPrefix: string = 'https://localhost:7018';

  constructor(private httpBackend: HttpBackend) {
  }

  public log(logMsg: string): Observable<any> {
    // debugger
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post(this.urlPrefix + "/api/RouterLogger/api/routerlogger/", { log: logMsg },
      //{ headers: new HttpHeaders().set("content-type", "text/plain") }
    );

  }}
