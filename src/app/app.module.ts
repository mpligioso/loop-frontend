import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

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

@NgModule({
  imports: [
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
    NotFoundPageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
