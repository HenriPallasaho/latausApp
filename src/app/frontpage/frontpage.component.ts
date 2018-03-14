import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {OpenChargeService} from '../services/open-charge.service';
import {DirectionsService} from '../services/directions.service';
import {AgmMap, MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';
import {RouteDirective} from '../route.directive';

declare var google: any;

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss'],

})
export class FrontpageComponent implements OnInit {
  asemat: any;
  asema: any;
  reittiTaulukko: any;
  lat: number;
  lon: number;
  luokka = 'dropdown';
  zoom = 13;
  origin: any;
  destination: any;
  travelmode: any;
  directions = 'https://www.google.com/maps/dir/?api=1&';
  directionUrl = '';
  // google route
  // directions = 'https://www.google.com/maps/embed/v1/directions' +'?key=AIzaSyDFIzgnI_1A0wVAgxrymkuVqr6uiSxhsPI';
  distance: any;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  @ViewChild('map') map: AgmMap;

  constructor(
      private routeDirective: RouteDirective,
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private chargeService: OpenChargeService) {
  }

  ngOnInit() {
    // create search FormControl

    this.omaLokaatio();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
          <HTMLInputElement>document.getElementById('address'), {
            types: ['address'],
          });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.lat = place.geometry.location.lat();
          this.lon = place.geometry.location.lng();
          this.haePisteet(this.lat, this.lon);
          this.zoom = 13;

        });
      });
    });
  }

  omaLokaatio() {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      this.haePisteet(position.coords.latitude, position.coords.longitude);
    });
  }

  haePisteet(lat, lon) {
    this.chargeService.haePisteet(lat, lon).subscribe(response => {
      console.log(response);
      this.asemat = response;

    });

  }

  matka(asema) {
    this.distance = asema['AddressInfo'].Distance;
    this.distance = Math.round(this.distance * 100) / 100;
    return this.distance;
  }

  haeReitti(lat, lon, asema) {

    this.origin = new google.maps.LatLng(lat, lon);
    this.destination = new google.maps.LatLng(asema['AddressInfo'].Latitude,
        asema['AddressInfo'].Longitude);

    this.chargeService.origin = this.origin;
    this.chargeService.destination = this.destination;

    this.directionUrl = this.directions + '&origin=' + this.lat + ',' +
        this.lon +
        '&destination=' + this.asema['AddressInfo'].Latitude + ',' +
        this.asema['AddressInfo'].Longitude;
    console.log(this.directionUrl);

  }

  klikki(evt, asemaId) {  // klikattaessa hakutulosta, infot aukeaa alapuolelle
    console.log(evt);
    evt.target.querySelector('div').style = 'display: block';
    evt.target.querySelector('button').style = 'display: block';
    this.chargeService.asemaID = asemaId;
    console.log(this.chargeService.asemaID);
    // reitti
    this.asema = this.asemat[this.chargeService.asemaID];
    if (this.chargeService.asemaID < 100) {

      this.haeReitti(this.lat, this.lon, this.asema);
    }
  }

  sulje(evt) {  // klikattaessa sulje-nappia, hakutulokset peitetään
    evt.stopPropagation();
    console.log( evt.target.parentElement);
    evt.target.parentElement.querySelector('div').style = 'display: none';
    evt.target.parentElement.querySelector('button').style = 'display: none';
    this.chargeService.asemaID = 999;
  }

  navigoi() {
    window.open(this.directionUrl);
  }

}
