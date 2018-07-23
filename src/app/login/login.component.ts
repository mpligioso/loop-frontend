import { Component, OnInit } from "@angular/core";
import { LoginSubmission, AuthService } from "../api/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: LoginSubmission = new LoginSubmission();

  constructor(public myAuthServ: AuthService, public myRouterServ: Router) {}

  ngOnInit() {}

  loginSubmit() {
    this.myAuthServ
      .postLogin(this.loginForm)
      .then(response => {
        this.myRouterServ.navigateByUrl("/dashboard");
      })
      .catch(err => {
        alert("Oups...La connexion a échoué.");
        console.log(err);
      });
  }
}
