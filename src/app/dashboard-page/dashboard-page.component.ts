import { Component, OnInit } from "@angular/core";
import { AuthService, User } from "../api/auth.service";
import { TripsService, Trip, Location } from "../api/trips.service";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.css"]
})
export class DashboardPageComponent implements OnInit {
  userData: User;
  faPencilAlt = faPencilAlt;

  constructor(
    public myAuthServ: AuthService,
    private myTripServ: TripsService
  ) {}

  ngOnInit() {
    this.getUserInfo();
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
}
