import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {JsonpModule, Jsonp, Response, Http} from '@angular/http';
import 'rxjs/add/operator/map'
import { SearchService } from '../../services/search.service';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  sport_name : String;
  location: String;
  experience: String;
  searchURL: string;
  searchType = "teammate";
  map: any;

  constructor(private searchService: SearchService,
              private router: Router, private jsonp: Jsonp,
              private http:Http, private dataService:DataService

  ) { }

  ngOnInit() {
  }

  changeSearchType(type) {
    this.searchType = type;
  }

  onSearchSubmit(){
    if(this.searchType === "opponent" || this.searchType === "teammate") {
    const search = {
        sport_name: this.sport_name,
        experience: this.experience,
        location: this.location
    }
    console.log(this.searchType);
    this.searchService.findOpponents(search).subscribe(data => {
      if(data.success) {
        this.router.navigate(['/search']);
      } else {
        console.log('Something went wrong. Please try again later.');
      }
    });

    const sport = this.sport_name;
    const location = this.location;
    const experience = this.experience;
    this.router.navigate(['/search', sport, experience, location]);

  } else if(this.searchType === "venue") {
    console.log(this.searchType);
    const search = {
      sport_name: this.sport_name,
      location: this.location
    }
    this.searchURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + search.sport_name + '+courts+in+' + search.location + '&key=AIzaSyB5oqtbEdUtP1TmVDXf3PWEwUh05x7R6uc';
    console.log(this.searchURL);
    //this.loadAllUsers();
    //this.http.get(this.searchURL).subscribe((res:Response) => console.log(res));
    //this.loadData();
    this.router.navigate(['/search']);

  }
  }
/*  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
} */


/*  loadData() {
    //return console.log(this.http.get(this.searchURL).map(this.extractData).subscribe(data => data));
    var xhr = new XMLHttpRequest();
    xhr.open('GET', this.searchURL);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    xhr.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    xhr.send();

    console.log(xhr);
} */
/*private loadAllUsers() {
    this.dataService.getAll().subscribe(response=> {
      this.gmapsData = response;
    });

  } */


}
