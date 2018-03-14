import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DirectionsService {


  constructor(private http: HttpClient) { }

  haeReitti(url) {
    return this.http.get<Array<Object>>(url);
  }

}
