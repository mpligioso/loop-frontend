import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
const { backendUrl } = environment;

@Injectable({
  providedIn: "root"
})
export class AuthService {
  currentUser: User;

  constructor(private myHttpServ: HttpClient, private myRouterServ: Router) {}

  //POST /api/login
  postLogin(loginInfo: LoginSubmission) {
    return this.myHttpServ
      .post(`${backendUrl}/api/login`, loginInfo, { withCredentials: true })
      .toPromise()
      .then((response: any) => {
        //update currentuser if loggedIn successfully
        this.currentUser = response.userDoc;
        return response;
      });
  }

  //POST /api/signup
  postSignup(signupInfo: SignupSubmission) {
    return this.myHttpServ
      .post(`${backendUrl}/api/signup`, signupInfo, { withCredentials: true })
      .toPromise()
      .then((response: any) => {
        this.currentUser = response.userDoc;
        return response;
      });
  }

  //DELETE /api/logout
  logout() {
    return this.myHttpServ
      .delete(`${backendUrl}/api/logout`, { withCredentials: true })
      .toPromise()
      .then((response: any) => {
        this.currentUser = response.userDoc;
        return response;
      });
  }

  //GET /api/checklogin
  check() {
    return this.myHttpServ
      .get(`${backendUrl}/api/checklogin`, { withCredentials: true })
      .toPromise()
      .then((response: any) => {
        this.currentUser = response.userDoc;
        return response;
      });
  }

  isLoggedIn() {
    if (this.currentUser) {
      return true;
    } else {
      return false;
    }
  }
}

export class User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isDriver: boolean;
  createdAt: string;
  updatedAt: string;
}

export class LoginSubmission {
  email: string;
  loginPassword: string;
}

export class SignupSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  originalPassword: string;
  isDriver: boolean;
}
