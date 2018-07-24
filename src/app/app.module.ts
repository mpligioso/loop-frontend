import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";
import { TripDetailsPageComponent } from "./trip-details-page/trip-details-page.component";
import { ResultsPageComponent } from "./results-page/results-page.component";
import { RequestsPageComponent } from "./requests-page/requests-page.component";
import { UserProfilePageComponent } from "./user-profile-page/user-profile-page.component";
import { CreateTripComponent } from "./create-trip/create-trip.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { SettingsComponent } from "./settings/settings.component";
import { TripListComponent } from "./dashboard-page/trip-list/trip-list.component";
import { environment } from "../environments/environment";


@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAP_API_KEY,
      libraries: ["places"]
    }),
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    LandingPageComponent,
    DashboardPageComponent,
    TripDetailsPageComponent,
    ResultsPageComponent,
    RequestsPageComponent,
    UserProfilePageComponent,
    CreateTripComponent,
    SettingsComponent,
    NotFoundPageComponent,
    TripListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
