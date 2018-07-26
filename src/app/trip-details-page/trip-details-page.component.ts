/// <reference types="googlemaps" />
import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from "@agm/core";
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-trip-details-page',
  templateUrl: './trip-details-page.component.html',
  styleUrls: ['./trip-details-page.component.css']
})
export class TripDetailsPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  };
}
