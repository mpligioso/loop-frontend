import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { CreateTripComponent } from "./create-trip/create-trip.component";
import { ResultsPageComponent } from "./results-page/results-page.component";
import { RequestsPageComponent } from "./requests-page/requests-page.component";
import { UserProfilePageComponent } from "./user-profile-page/user-profile-page.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { TripDetailsPageComponent } from "./trip-details-page/trip-details-page.component";
import { AuthGuard } from "./guard/auth.guard";


const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "dashboard", component: DashboardPageComponent },
  { path: "trip/add", component: CreateTripComponent },
  { path: "trip/:tripId", component: TripDetailsPageComponent },
  { path: "results", component: ResultsPageComponent },
  { path: "requests", component: RequestsPageComponent },
  { path: "profile/:userId", component: UserProfilePageComponent},
  { path: "**", component: NotFoundPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
