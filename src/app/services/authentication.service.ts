import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.development";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private jwtHelper!: JwtHelperService;

  constructor(private http: HttpClient, ) {
    this.jwtHelper = new JwtHelperService();
  }

  public login(body: any): Observable<any> {
    return this.http.post<any>(environment.baseURL + "/api/login", body);
  }

  public checkLogin(): boolean {
    return !(sessionStorage.getItem("token") == null && sessionStorage.getItem("username") == null);
  }

  getInfo(token: string): { username: string, role: string } {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return {
      username: decodedToken.sub,
      role: decodedToken.role
    };
  }
}
