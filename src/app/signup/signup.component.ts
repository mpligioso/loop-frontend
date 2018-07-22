import { Component, OnInit } from "@angular/core";
import { SignupSubmission, AuthService } from "../api/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  signupForm: SignupSubmission = new SignupSubmission();
  rForm: FormGroup;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  originalPassword: string;
  isDriver: boolean;

  constructor(
    public myAuthServer: AuthService,
    private myRouterServ: Router,
    private fb: FormBuilder
  ) {
    this.rForm = fb.group({
      firstName: [null, Validators.required],
      lastName: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(30),
          Validators.maxLength(500)
        ])
      ],
      phoneNumber: [null, Validators.required],
      email: [null, Validators.required],
      originalPassword: [null, Validators.required],
      isDriver: [null, Validators.required]
    });
  }

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
