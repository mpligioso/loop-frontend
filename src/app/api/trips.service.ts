import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";

const { backendUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private myHttpServ: HttpClient,
    private myRouterServ: Router) { }

    getTrips() {
      return this.myHttpServ
        .get(`${backendUrl}/api/trips`, { withCredentials: true })
        .toPromise();
    }

    postTrip(tripInfo: TripSubmission){
      return this.myHttpServ
        .post(`${backendUrl}/api/trips`, tripInfo, { withCredentials: true })
        .toPromise()
    }
}

export class TripSubmission {
  departAddress: {
    string: string;
  } = { string: "" };
  arrivalAddress: {
    string: string;
  } = { string: "" };
  departDate: Date;
  departTime : string;
  comment: string;
}

export class TripInput {
  departAddress: string;
  arrivalAddress: string;
  departDate: Date;
  departHour: string;
  departMin: string;
  comment: string;
}