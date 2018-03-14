import {Directive, Input, OnChanges, OnInit} from '@angular/core';
import {GoogleMapsAPIWrapper} from '@agm/core';
import {FrontpageComponent} from './frontpage/frontpage.component';
import {OpenChargeService} from './services/open-charge.service';

declare var google: any;

@Directive({
  selector: 'sebm-google-maps-directions',
})

export class RouteDirective implements OnChanges {

  @Input() origin;
  @Input() destination;
  @Input() travelmode;

  directionsService: any;
  directionsDisplay: any;

  constructor(
      private gmapsApi: GoogleMapsAPIWrapper,
      private chargeService: OpenChargeService) {
  }

  ngOnChanges() {

    this.gmapsApi.getNativeMap().then(map => {
      if (this.directionsDisplay != null) {
        this.directionsDisplay.setMap(null);
      }

      this.directionsService = new google.maps.DirectionsService();
      this.directionsDisplay = new google.maps.DirectionsRenderer();

      this.directionsDisplay.setMap(map);
      this.directionsDisplay.setOptions({suppressMarkers: true});
      /*this.origin = new google.maps.LatLng(40.6892746, -74.04455589999998);
      this.destination = new google.maps.LatLng(40.758896, -73.985130);*/

      const options = {
        origin: this.chargeService.origin,
        destination: this.chargeService.destination,
        travelMode: google.maps.TravelMode.DRIVING,
      };
      console.log(options);
      this.directionsService.route(options, (response, status) => {
        console.log('yhyy1');

        console.log(response);
        if (status === 'OK') {
          this.directionsDisplay.setDirections(null);
          this.directionsDisplay.setDirections(response);
        } else {
          window.alert('Direction failed' + status);
        }
      });
    });

  }

}

