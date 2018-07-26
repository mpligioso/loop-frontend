import { Component, OnInit } from '@angular/core';
import { Match, MatchService } from '../api/match.service';
import { User, AuthService } from '../api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests-page',
  templateUrl: './requests-page.component.html',
  styleUrls: ['./requests-page.component.css']
})
export class RequestsPageComponent implements OnInit {
  matchData: Array<Match> = [];
  userData: User;
  match: Match;
  matchId: string;

  constructor(
    public myAuthServ: AuthService,
    private myMatchServ: MatchService,
    private myRouterServ: Router
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

  removeMatch(matchId){
    const isOkay = confirm("Voulez-vous enlever la demande?");

    if(isOkay){
      this.myMatchServ.deleteMatch(matchId)
        .then((response) => {
          this.myRouterServ.navigateByUrl("/dashboard");
          alert("Le match a été supprimé")
        })
        .catch((err) => {
          console.log(err);
        })
      }
  }

  acceptMatch(matchId){
    const isOkay = confirm("Voulez-vous accepter la demande?");

    if(isOkay){
      this.myMatchServ.changeMatchStatus(matchId)
        .then((response) => {
          this.myRouterServ.navigateByUrl("/requests")
        })
        .catch((err) => {
          alert("Oups! Votre demande ne peut pas être confirmé.")
          console.log(err)
        });
    }
  }

}
