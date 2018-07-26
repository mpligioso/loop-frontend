import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from "../../environments/environment";
import { User } from './auth.service';
const { backendUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(
    private myHttpServ: HttpClient,
    private myRouterServ: Router,
  ) { }

  getMatchRequests(){
    return this.myHttpServ
      .get(`${backendUrl}/api/matches`, {withCredentials: true})
      .toPromise()
  }

  createMatchRequest(tripId, matchId){
    return this.myHttpServ
    .post(`${backendUrl}/api/trip/${tripId}/matches`, {matchId}, {withCredentials: true})
    .toPromise()
  }

  changeMatchStatus(matchId, isDriver){
    return this.myHttpServ
    .put(`${backendUrl}/api/match/${matchId}`, {isDriver}, {withCredentials: true})
    .toPromise()
  }

  deleteMatch(matchId){
    return this.myHttpServ
    .delete(`${backendUrl}/api/match/${matchId}`, {withCredentials: true})
    .toPromise()
  }

}

export class Match {
  _id: string;
  driverTripId: TripInMatch;
  passengerTripId: TripInMatch;
  acceptedByDriver: boolean;
  acceptedByPassenger: boolean;
  createdAt: string;
  updatedAt: string;
}

export class TripInMatch {
  comment: string;
  departDateAndTime: Date;
  createdAt: string;
  updatedAt: string;
  endLocation: Location;
  startLocation: Location;
  user: User;
  numberOfSeats: number;
}

export class newMatchSubmission {
  tripId: string;
  matchId: string;
}