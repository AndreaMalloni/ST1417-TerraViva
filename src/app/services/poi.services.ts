import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PoiServices {

  constructor(private http: HttpClient) {
  }

  getPOI(): Observable<any> {
    return this.http.get<any>(environment.baseURL + "/api/POI");
  }

  creation(body: any): Observable<any> {

    body.author = {username: sessionStorage.getItem("username")};

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = {headers: headers};

    return this.http.post<any>(environment.baseURL + "/api/POI", body, options);
  }
}
