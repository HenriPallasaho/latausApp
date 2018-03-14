import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FrontpageComponent} from './frontpage/frontpage.component';
import {HttpClientModule} from '@angular/common/http';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import {ChargelistComponent} from './chargelist/chargelist.component';
import {OpenChargeService} from './services/open-charge.service';
import {DirectionsService} from './services/directions.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouteDirective } from './route.directive';


@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent,
    ChargelistComponent,
    RouteDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCz8zKmLgTdUhZjIhHaJhYcj5uET0mPmtk', libraries: ['geometry', 'places']
    }),
    FormsModule,
      ReactiveFormsModule

  ],
  providers: [OpenChargeService, DirectionsService, RouteDirective, GoogleMapsAPIWrapper],
  bootstrap: [AppComponent],
})
export class AppModule {
}



