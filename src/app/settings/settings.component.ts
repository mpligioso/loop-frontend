import { Component, OnInit } from "@angular/core";
import {
  SettingsService,
  SettingsSubmission,
  Address,
  CarSubmission
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
  carForm: CarSubmission = new CarSubmission();

  needs = [
    { id: "debout", text: "J'ai besoin d'aide pour me mettre debout" },
    { id: "asseoir", text: "J'ai besoin d'aide pour m'asseoir" },
    { id: "mail", text: "J'ai besoin d'aide pour utiliser un téléphone ou une boîte mail" },
    { id: "voir", text: "J'ai des difficultés à voir" },
    { id: "marcher", text: "J'ai des difficultés à marcher" },
    { id: "entendre", text: "J'ai des difficultés à entendre" },
    { id: "parler", text: "J'ai des difficultés à parler" },
    { id: "animal", text: "Je me déplace avec un animal d'assistance" },
    { id: "fauteuil", text: "Je me déplace avec un fauteuil" },
  ];

  constructor(
    public mySettingsServer: SettingsService,
    private myRouterServ: Router,
    public myAuthServ: AuthService
  ) {}

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

  carSubmit() {
    this.mySettingsServer
      .postCar(this.carForm)
      .then(response => {
        alert("Votre voiture a bien été ajoutée!");
        this.myRouterServ.navigateByUrl("/settings");
      })
      .catch(err => {
        alert("Sorry! We couldn't add your car!");
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

  checkArray(text) {
    const { specificNeedsA } = this.settingsForm;

    if (specificNeedsA.includes(text)) {
      specificNeedsA.splice(specificNeedsA.indexOf("text"), 1);
    }
    else {
      specificNeedsA.push(text);
    }
    console.log(this.settingsForm)
  }
}