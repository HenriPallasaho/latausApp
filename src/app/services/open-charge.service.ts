import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class OpenChargeService {

  openApi = 'https://api.openchargemap.io/v2/poi/';
  reverse = 'https://maps.googleapis.com/maps/api/geocode/json';
  key = 'AIzaSyDFIzgnI_1A0wVAgxrymkuVqr6uiSxhsPI';
  origin: any;
  destination: any;
  asemaID = 999;


  constructor(private http: HttpClient) {
  }

  haePisteet(lat, lon) {
    return this.http.get<Array<Object>>(this.openApi +
        '?output=json&latitude=' + lat + '&longitude=' +
        lon + '&maxresults=8');
  }



}
