import { Component, OnInit } from "@angular/core";
import {
  SettingsService,
  SettingsSubmission,
  Address,
  Car
} from "../api/settings.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
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
      newPassword: [null, Validators.required],

    });
  }

  ngOnInit() {}

  settingsSubmit() {
    this.mySettingsServer
      .postSettings(this.settingsForm)
      .then(response => {
        this.myRouterServ.navigateByUrl("/dashboard");
      })
      .catch(err => {
        alert("Sorry! We couldn't sign you up!");
        console.log(err);
      });
  }
}
