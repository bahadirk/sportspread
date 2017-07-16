import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  sport_name : String;
  location: String;
  experience: String;
  searchType = "teammate";

  constructor(private searchService: SearchService,
              private router: Router,
  ) { }

  ngOnInit() {
  }

  changeSearchType(type) {
    this.searchType = type;
  }

  onSearchSubmit(){
    const sport = this.sport_name;
    const location = this.location;
    const experience = this.experience;
    this.router.navigate(['/search', sport, experience, location]);

  }
}
