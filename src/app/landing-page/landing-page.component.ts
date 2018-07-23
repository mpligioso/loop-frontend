import { Component, OnInit } from '@angular/core';
import {faSearch, faQuestionCircle, faPaperPlane, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  faSearch = faSearch;
  faUsers = faUsers;
  faQuestionCircle = faQuestionCircle;
  faPaperPlane = faPaperPlane;




  constructor() { }

  ngOnInit() {
  }

}
