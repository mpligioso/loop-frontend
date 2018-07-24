import { Component, OnInit } from '@angular/core';
import { Trip, TripsService } from '../api/trips.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css']
})
export class ResultsPageComponent implements OnInit {
  matchResults: Array<Trip> = [];
  id: string;

  constructor(
    private myActivatedRouteServ: ActivatedRoute,
    private myTripServ: TripsService,
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
      .then((response: Array<Trip>) => {
        console.log(response)
        this.matchResults = response;
      })
      .catch((err) => {
        alert("Oups, nous n'avons pas réussi à récupérer vos matchs")
        console.log(err)
      })
  }
}
