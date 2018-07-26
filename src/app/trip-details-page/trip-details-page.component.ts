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
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay2 = new google.maps.DirectionsRenderer;

  constructor() { }

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  };
    // directionsDisplay.setMap(map);
    // directionsDisplay2.setMap(map);
  

}
