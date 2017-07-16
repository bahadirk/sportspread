import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class SearchService {

  authToken: any;

  constructor(private http: Http) { }

  findTeammates(search) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/teammates', search, {headers: headers})
      .map(res => res.json());
  }

  findOpponents(search) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/opponents', search, {headers: headers})
      .map(res => res.json());
  }

  findInstructors(search) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/instructors', search, {headers: headers})
      .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

}
