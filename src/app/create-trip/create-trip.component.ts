import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripsService, TripSubmission, TripInput } from '../api/trips.service';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit {
  tripForm: TripInput = new TripInput();
  tripBackend: TripSubmission = new TripSubmission();

  constructor(private myTripsServ: TripsService,
  private myRouterServ: Router) { }

  ngOnInit() {
  }


  tripSubmit() {

    console.log("TRIPFORM :", this.tripForm);
    console.log(this.tripForm.departAddress);

    this.tripBackend.departAddress.string = this.tripForm.departAddress;
    this.tripBackend.arrivalAddress.string = this.tripForm.arrivalAddress;
    this.tripBackend.departDate = this.tripForm.departDate;
    this.tripBackend.departTime = `${this.tripForm.departHour}:${this.tripForm.departMin}:00`;
    this.tripBackend.comment = this.tripForm.comment;

    console.log("TRIPBACKEND :", this.tripBackend);
    this.myTripsServ
      .postTrip(this.tripBackend)
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
