import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  sport_name : String = "";
  location: String = "";
  experience: String = "";
  searchType = "Teammate";
  type_account: any;

  constructor(private searchService: SearchService,
              private router: Router
  ) { }

  ngOnInit() {
    this.type_account = localStorage.getItem('profile');
    this.type_account = JSON.parse(this.type_account);
  }

  changeSearchType(type) {
    this.searchType = type;
  }

  onSearchSubmit() {
    this.router.navigate(['/search', this.searchType, this.sport_name, this.location, this.experience]);
  }
}
