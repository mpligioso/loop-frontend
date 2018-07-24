import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
const { backendUrl } = environment;

@Injectable({
  providedIn: "root"
})
export class TripsService {
  constructor(private myHttpServ: HttpClient, private myRouterServ: Router) {}

    getTrips() {
      return this.myHttpServ
        .get(`${backendUrl}/api/trips`, { withCredentials: true })
        .toPromise();
    }

    postTrip(tripInfo: TripInput){
      return this.myHttpServ
        .post(`${backendUrl}/api/trips`, tripInfo, { withCredentials: true })
        .toPromise()
    }

    getTripDetails(tripId){
      return this.myHttpServ
        .get(`${backendUrl}/api/trip/${tripId}`, { withCredentials: true })
        .toPromise()
    }

    updateTrip(tripId){
      return this.myHttpServ
      .put(`${backendUrl}/api/trip/${tripId}`, { withCredentials: true })
      .toPromise()
    }

    deleteTrip(tripId){
      return this.myHttpServ
      .delete(`${backendUrl}/api/trip/${tripId}`, { withCredentials: true })
      .toPromise()
    }

    getTripMatches(tripId){
      return this.myHttpServ
      .get(`${backendUrl}/api/trip/${tripId}/matches`, { withCredentials: true })
      .toPromise()
    }
}

export class TripInput {
  startAddress: string;
  startLatitude: number;
  startLongitude: number;
  endLatitude: number;
  endLongitude: number;
  endAddress: string;
  departDate: Date;
  departHour: string;
  departMin: string;
  comment: string;
}

export class Trip {
  _id: string;
  user: string;
  departDateAndTime: Date;
  endLocation: Location;
  startLocation: Location;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export class Location {
  string: string;
  coordinates: Array<number>
}