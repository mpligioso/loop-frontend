import { Component, OnInit } from "@angular/core";
import {
  SettingsService,
  SettingsSubmission,
  Address,
  Car
} from "../api/settings.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User, AuthService } from "../api/auth.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  currentUser: User;
  settingsForm: SettingsSubmission = new SettingsSubmission();
  rForm: FormGroup;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  oldPassword: string;
  newPassword: string;
  pictureURL: string;
  gender: string;
  address: Address;
  licenseNumber: string;
  cars: Array<Car>;
  specificNeedsA: boolean;
  specificNeedsB: boolean;

  constructor(
    public mySettingsServer: SettingsService,
    private myRouterServ: Router,
    public myAuthServ: AuthService,
    private fb: FormBuilder
  ) {
    this.rForm = fb.group({
      firstName: [null, Validators.required],
      lastName: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(500)
        ])
      ],
      phoneNumber: [null, Validators.required],
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getUserInfo();
  }

  settingsSubmit() {
    this.mySettingsServer
      .postSettings(this.settingsForm)
      .then(response => {
        this.myRouterServ.navigateByUrl("/dashboard");
      })
      .catch(err => {
        alert("Sorry! We couldn't change your settings!");
        console.log(err);
      });
  }

  getUserInfo() {
    this.myAuthServ
      .check()
      .then((response: any) => {
        this.currentUser = response.userDoc;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
