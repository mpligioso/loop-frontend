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
  duration: number;
  match: matchedTrip;
  id: string;
  matchId: string;
  userTrip: Trip;
  routeResult: ABCDTripResult;


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
        if (!response.hasOwnProperty("dur")){
          this.match = undefined;
          console.log("match =", this.match)
          return;
        }
        console.log("match =", response)

        this.match = response;
        this.duration = Math.floor(this.match.dur / 60);

        this.getUserTrip(this.match);
      })
      .catch((err) => {
        alert("Oups! nous n'avons pas réussi à récupérer vos matchs.")
        console.log(err)
      })
  }

  getUserTrip(match: matchedTrip){
    this.myTripServ.getTripDetails(this.id)
      .then((response: any)=>{
        console.log("Posted trip =", response);
        this.userTrip = response;
        this.initMap(this.match, this.userTrip);
      })
      .catch((err)=>{
        alert("Un problème est survenu. Essayez d'actualiser.")
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

  //Map initialisation (default coordinates : Paris)
 initMap(match: matchedTrip, userTrip: Trip) {
  let directionsDisplay = new google.maps.DirectionsRenderer();
  let mapOptions = {
    zoom:14,
    center: new google.maps.LatLng(48.8566667, 2.3509871),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(this.gmapElement.nativeElement, mapOptions);
  directionsDisplay.setMap(map);
  this.calcRoute(match, userTrip, directionsDisplay)
}


 calcRoute(match: matchedTrip, userTrip: Trip, directionsDisplay) {
  const matchStart = match.trip.startLocation.string;
  const matchEnd = match.trip.endLocation.string;
  const userStart = userTrip.startLocation.string;
  const userEnd = userTrip.endLocation.string;
  // const matchStart = [match.trip.startLocation.coordinates[1],match.trip.startLocation.coordinates[0]];
  // const matchEnd = [match.trip.endLocation.coordinates[1],match.trip.endLocation.coordinates[0]];
  // const userStart = [userTrip.startLocation.coordinates[1],userTrip.startLocation.coordinates[0]];
  // const userEnd = [userTrip.endLocation.coordinates[1],userTrip.endLocation.coordinates[0]];
  var request = match.trip.user.isDriver
   ? {
    origin: matchStart,
    destination: matchEnd,
    waypoints: [{
      location: userStart,
      stopover: true
    }, {
      location: userEnd,
      stopover: true
    }
    ],
    travelMode: google.maps.TravelMode.DRIVING
  } : {
    origin: userStart,
    destination: userEnd,
    waypoints: [{
      location: matchStart,
      stopover: true
    }, {
      location: matchEnd,
      stopover: true
    }
    ],
    travelMode: google.maps.TravelMode.DRIVING
  };

  this.directionsService.route(request, function(result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      console.log("route result=", result);
      this.routeResult=result;
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

class ABCDTripResult {
  geocoded_waypoints: any;
  request: any;
  origin: any;
  travelMode: string;
  waypoints: Array<any>;
  routes: Array<any>;
  status: string;
  }