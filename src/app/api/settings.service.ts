import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./auth.service";

import { environment } from "../../environments/environment";

const { backendUrl } = environment;

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  currentUser: User;

  constructor(private myHttpServ: HttpClient) {}

  // POST /api/login
  postSettings(settingsInfo: SettingsSubmission) {
    return this.myHttpServ
      .post(`${backendUrl}/api/settings`, settingsInfo, {
        withCredentials: true
      })
      .toPromise()
      .then((response: any) => {
        this.currentUser = response.userDoc;
        return response;
      });
  }
}

export class SettingsSubmission {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  phoneNumber: string = "";
  isDriver: boolean;
  oldPassword: string = "";
  newPassword: string = "";
  pictureURL: string = "";
  gender: string = "";
  address: Address;
  licenseNumber: string = "";
  cars: Array<Car>;
  specificNeedsA: boolean;
  specificNeedsB: boolean;
}

export class Address {
  string: string;
  lat: number;
  long: number;
}

export class Car {
  brand: string;
  model: string;
  color: string;
  licensePlate: string;
  numberOfSeats: number;
}
