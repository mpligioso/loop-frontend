///<reference types="googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { Trip, TripsService, matchedTrip } from '../api/trips.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService, newMatchSubmission } from '../api/match.service';
//import { } from 'googlemaps';
//import { MapsAPILoader } from "@agm/core";


@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css']
})
export class ResultsPageComponent implements OnInit {
  match: matchedTrip;
  id: string;
  matchId: string;

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;


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
      });
      
    
        var mapProp = {
          center: new google.maps.LatLng(48.8566667, 2.3509871),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

        // var mapObj;
        //   var directionsService = new google.maps.DirectionsService;
        //   var directionsDisplay = new google.maps.DirectionsRenderer;
        //   var directionsDisplay2 = new google.maps.DirectionsRenderer;
        //   mapObj = new google.maps.Map(document.getElementById('map'), {
        //       zoom: 10,
        //       center: {
        //         lat: 43.58,
        //         lng: -0.83
        //       }
        //     });
        //   directionsDisplay.setMap(mapObj);
        //   directionsDisplay2.setMap(mapObj);
  
       

    
      // directionsService = new google.maps.DirectionsService;
      // directionsDisplay = new google.maps.DirectionsRenderer;
      // directionsDisplay2 = new google.maps.DirectionsRenderer;
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
        })
        .catch((err) => {
          alert("Oups! Nous n'avons pas réussi à envoyer votre demande.")
          console.log(err)
        });
      }
  }

}
