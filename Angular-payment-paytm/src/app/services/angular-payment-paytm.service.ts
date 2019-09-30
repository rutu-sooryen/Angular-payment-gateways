import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AngularPaymentPaytmService {

  constructor(private http: HttpClient) { }

  configUrl = 'server.js';

  getChecksum() {
    return this.http.get(this.configUrl);
  }

}
