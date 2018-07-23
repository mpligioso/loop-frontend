import { Component, OnInit } from "@angular/core";
import { User, AuthService } from "../api/auth.service";

@Component({
  selector: "app-user-profile-page",
  templateUrl: "./user-profile-page.component.html",
  styleUrls: ["./user-profile-page.component.css"]
})
export class UserProfilePageComponent implements OnInit {
  userData: User;

  constructor(public myAuthServ: AuthService) {}

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
