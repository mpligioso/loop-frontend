import { Component, OnInit } from '@angular/core';
import { Trip, TripsService } from '../../api/trips.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  tripData: Array<Trip> = [];

  constructor(
    private myTripServ: TripsService
  ) { }

  ngOnInit() {
    this.getUserTrips();
  }

  getUserTrips(){
    this.myTripServ.getTrips()
      .then((results: any) => {
        this.tripData = results;
        console.log(results)
      })
      .catch((err) => {
        console.log(err)
      })
  }

}
