///<reference types="googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
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


  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

   //Directions setup
  directionsService = new google.maps.DirectionsService();


  constructor(
    private myActivatedRouteServ: ActivatedRoute,
    private myTripServ: TripsService,
    private myMatchServ: MatchService,
    private myRouterServ: Router
  ) { }

  ngOnInit() {
    //this.initMap();
    this.myActivatedRouteServ.paramMap
      .subscribe((myParams) => {
        this.id = myParams.get("tripId")
        this.getMatchResults();
      });
  }

  getMatchResults(){
    this.myTripServ.getTripMatches(this.id)
      .then((response: matchedTrip) => {
        console.log(response)
        this.match = response;
        this.initMap(this.match)
      })
      .catch((err) => {
        alert("Oups! nous n'avons pas réussi à récupérer vos matchs.")
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

  //Map initialisation (default coordinates : Paris)
 initMap(match: matchedTrip) {
  let directionsDisplay = new google.maps.DirectionsRenderer();
  let mapOptions = {
    zoom:14,
    center: new google.maps.LatLng(48.8566667, 2.3509871),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(this.gmapElement.nativeElement, mapOptions);
  directionsDisplay.setMap(map);
  this.calcRoute(match, directionsDisplay)
}


 calcRoute(match: matchedTrip, directionsDisplay) {
  var start = match.trip.startLocation.string;
  var end = match.trip.endLocation.string;
  var request = {
    origin: start,
    destination: end,
    // waypoints: [{
    //   location: ,
    //   stopover: true
    // }, {
    //   location: ,
    //   stopover: true
    // }
    //],
    travelMode: google.maps.TravelMode.DRIVING
  };
  this.directionsService.route(request, function(result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      console.log(result)
      directionsDisplay.setDirections(result);
      directionsDisplay.setOptions({
          polylineOptions: {
            strokeColor: "blue"
          }
      });
    }
  });
}

}
