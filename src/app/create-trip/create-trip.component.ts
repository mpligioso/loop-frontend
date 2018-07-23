/// <reference types="googlemaps" />
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { TripsService, TripInput } from '../api/trips.service';
import { FormControl } from '@angular/forms';
//import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';



@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit {

  tripForm: TripInput = new TripInput();

  searchControl: FormControl;

  @ViewChild("searchDep")
 searchDepElementRef: ElementRef;

  @ViewChild("searchArr")
 searchArrElementRef: ElementRef;

  constructor(
    private myTripsServ: TripsService,
    private myRouterServ: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {

    //create search FormControl
    this.searchControl = new FormControl();

      //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocompleteDep = new google.maps.places.Autocomplete(this.searchDepElementRef.nativeElement, {
        types: ["address"]
      });

      autocompleteDep.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let placeDep: google.maps.places.PlaceResult = autocompleteDep.getPlace();

          //verify result
          if (placeDep.geometry === undefined || placeDep.geometry === null) {
            return;
          }

          //set departure address latitude, longitude
          this.tripForm.startLatitude = placeDep.geometry.location.lat();
          this.tripForm.startLongitude = placeDep.geometry.location.lng();
        });
      });

      let autocompleteArr = new google.maps.places.Autocomplete(this.searchArrElementRef.nativeElement, {
        types: ["address"]
      });

      autocompleteArr.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocompleteArr.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set arrival address latitude, longitude
          this.tripForm.endLatitude = place.geometry.location.lat();
          this.tripForm.endLongitude = place.geometry.location.lng();
        });
      });


    });
  }


  tripSubmit() {
    console.log(this.tripForm.startLatitude, this.tripForm.startLongitude, this.tripForm.endLatitude, this.tripForm.endLongitude)
    this.myTripsServ
      .postTrip(this.tripForm)
      .then(() => {
        this.myRouterServ.navigateByUrl(`/dashboard`);
        this.tripForm = new TripInput();
      })
      .catch(err => {
        alert("Un problème est survenu, nous n'avons pas réussi à créer le trajet.");
        console.log(err);
      });
  }

}
