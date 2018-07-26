/// <reference types="googlemaps" />
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from "@angular/core";
import { Router } from "@angular/router";
import { TripsService, TripInput } from "../api/trips.service";
import { FormControl } from "@angular/forms";
//import { } from 'googlemaps';
import { MapsAPILoader } from "@agm/core";
import { User, AuthService } from "../api/auth.service";

@Component({
  selector: "app-create-trip",
  templateUrl: "./create-trip.component.html",
  styleUrls: ["./create-trip.component.css"]
})
export class CreateTripComponent implements OnInit {
  userData: User;

  tripForm: TripInput = new TripInput();

  searchControl: FormControl;

  @ViewChild("searchDep") searchDepElementRef: ElementRef;

  @ViewChild("searchArr") searchArrElementRef: ElementRef;

  constructor(
    private myTripsServ: TripsService,
    private myRouterServ: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public myAuthServ: AuthService
  ) {}

  ngOnInit() {
    // get user data
    this.getUserInfo();

    //create search FormControl
    this.searchControl = new FormControl();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocompleteDep = new google.maps.places.Autocomplete(
        this.searchDepElementRef.nativeElement,
        {
          types: ["address"]
        }
      );

      autocompleteDep.setComponentRestrictions({ country: "fr" });

      autocompleteDep.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the arrival place result
          let placeDep: google.maps.places.PlaceResult = autocompleteDep.getPlace();

          //verify result
          if (placeDep.geometry === undefined || placeDep.geometry === null) {
            return;
          }

          //set departure address string, latitude, longitude
          this.tripForm.startLatitude = placeDep.geometry.location.lat();
          this.tripForm.startLongitude = placeDep.geometry.location.lng();
          this.tripForm.startAddress = placeDep.formatted_address;
        });
      });

      let autocompleteArr = new google.maps.places.Autocomplete(
        this.searchArrElementRef.nativeElement,
        {
          types: ["address"]
        }
      );

      autocompleteArr.setComponentRestrictions({ country: "fr" });

      autocompleteArr.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the arrival place result
          let placeArr: google.maps.places.PlaceResult = autocompleteArr.getPlace();

          //verify result
          if (placeArr.geometry === undefined || placeArr.geometry === null) {
            return;
          }

          //set arrival address string, latitude, longitude
          this.tripForm.endLatitude = placeArr.geometry.location.lat();
          this.tripForm.endLongitude = placeArr.geometry.location.lng();
          this.tripForm.endAddress = placeArr.formatted_address;
        });
      });
    });
  }

  tripSubmit() {
    this.myTripsServ
      .postTrip(this.tripForm)
      .then(() => {
        this.myRouterServ.navigateByUrl(`/dashboard`);
        this.tripForm = new TripInput();
      })
      .catch(err => {
        alert(
          "Un problème est survenu, nous n'avons pas réussi à créer le trajet."
        );
        console.log(err);
      });
  }

  getUserInfo() {
    this.myAuthServ
      .check()
      .then((response: any) => {
        this.userData = response.userDoc;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
