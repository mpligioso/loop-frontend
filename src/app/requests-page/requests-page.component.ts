import { Component, OnInit } from '@angular/core';
import { Match, MatchService } from '../api/match.service';
import { User, AuthService } from '../api/auth.service';

@Component({
  selector: 'app-requests-page',
  templateUrl: './requests-page.component.html',
  styleUrls: ['./requests-page.component.css']
})
export class RequestsPageComponent implements OnInit {
  matchData: Array<Match> = [];
  userData: User;

  constructor(
    public myAuthServ: AuthService,
    private myMatchServ: MatchService
  ) { }

  ngOnInit() {
    this.getUserMatchRequests();
    this.getUserInfo();
  }

  getUserMatchRequests(){
    this.myMatchServ.getMatchRequests()
      .then((results: Array<Match>) => {
        this.matchData = results;
      })
      .catch((err) => {
        console.log(err)
      });
  }

  getUserInfo() {
    this.myAuthServ
      .check()
      .then((response: any) => {
        this.userData = response;
      })
      .catch(err => {
        console.log(err);
      });
  }

}
