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
      lastName: [null, Validators.required],
      phoneNumber: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("0[0-9]{9}")
        ])
      ],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      originalPassword: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{7,}$')
        ])
      ],
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
