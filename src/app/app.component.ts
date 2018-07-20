import { Component } from '@angular/core';
import { AuthService } from './api/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Loop';

  constructor(
    public myAuthServ: AuthService
  ){

  }
}
