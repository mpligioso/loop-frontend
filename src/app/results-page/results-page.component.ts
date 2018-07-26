import { Component, OnInit } from '@angular/core';
import { Trip, TripsService, matchedTrip } from '../api/trips.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService, newMatchSubmission } from '../api/match.service';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css']
})
export class ResultsPageComponent implements OnInit {
  match: matchedTrip;
  id: string;
  matchId: string;


  constructor(
    private myActivatedRouteServ: ActivatedRoute,
    private myTripServ: TripsService,
    private myMatchServ: MatchService,
    private myRouterServ: Router
  ) { }

  ngOnInit() {
    this.myActivatedRouteServ.paramMap
      .subscribe((myParams) => {
        this.id = myParams.get("tripId")
        this.getMatchResults();
      })
  }

  getMatchResults(){
    this.myTripServ.getTripMatches(this.id)
      .then((response: matchedTrip) => {
        console.log(response)
        this.match = response;
      })
      .catch((err) => {
        alert("Oups, nous n'avons pas réussi à récupérer vos matchs")
        console.log(err)
      })
  }

  initMatchReq(matchId){
    const confirmReq = confirm("Voulez-vous confirmer la demande?");

    if(confirmReq){
      this.myMatchServ.createMatchRequest(this.id, matchId)
        .then((response) => {
          alert("Votre demande a été envoyée.")
          console.log(response)
          this.myRouterServ.navigateByUrl("/dashboard")
        })
        .catch((err) => {
          alert("Oups! Nous n'avons pas réussi à envoyer votre demande.")
          console.log(err)
        });
      }
  }

}
