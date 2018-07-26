import { Component, OnInit } from "@angular/core";
import { User, AuthService } from "../api/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-profile-page",
  templateUrl: "./user-profile-page.component.html",
  styleUrls: ["./user-profile-page.component.css"]
})
export class UserProfilePageComponent implements OnInit {
  // id: string;
  // userItem: User;
  constructor(private myRouterServ: Router) {}
  ngOnInit() {
    // this.getUserInfo();
  }
  // getUserInfo() {
  //   this.myAuthServ
  //     .check()
  //     .then((response: any) => {
  //       this.userData = response.userDoc;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
}
