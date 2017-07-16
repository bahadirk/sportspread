import { Injectable }   from '@angular/core';
import {Headers, Response, Http, RequestOptions}  from "@angular/http";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService{

  private venuesURL: string = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=Basketball+courts+in+Munich&key=AIzaSyB5oqtbEdUtP1TmVDXf3PWEwUh05x7R6uc';

  constructor(private http: Http) {};

  getAll() {
    //console.log(this.http.get(this.venuesURL).map((response: Response) => response.json()));
    return this.http.get(this.venuesURL).map((response: Response) => response.json());
  }

}
