import { Component, OnInit } from "@angular/core";
import { AuthService, User } from "../api/auth.service";
import { TripsService, Trip, Location } from "../api/trips.service";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.css"]
})
export class DashboardPageComponent implements OnInit {
  userData: User;
  // tripData: Array<Trip>;

  constructor(
    public myAuthServ: AuthService,
    private myTripServ: TripsService
  ) {}

  ngOnInit() {
    this.getUserInfo();
    // console.log(userData);
    // this.getUserTrips();
  }

  getUserInfo() {
    this.myAuthServ
      .check()
      .then((response: any) => {
        this.userData = response.userDoc;
      })
      .catch(err => {
        console.log(err);
      });
  }

  // getUserTrips(){
  //   this.myTripServ.getTrips()
  //     .then((results: any) => {
  //       this.tripData = results;
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }
}
