import { Component, OnInit } from "@angular/core";
import { SignupSubmission, AuthService } from "../api/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  signupForm: SignupSubmission = new SignupSubmission();

  constructor(public myAuthServer: AuthService, private myRouterServ: Router) {}

  ngOnInit() {}

  signupSubmit() {
    this.myAuthServer
      .postSignup(this.signupForm)
      .then(response => {
        this.myRouterServ.navigateByUrl("/");
      })
      .catch(err => {
        alert("Sorry! We couldn't sign you up!");
        console.log(err);
      });
  }
}
