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
    const search = {
        sport_name: this.sport_name,
        experience: this.experience,
        location: this.location
    }


    this.searchService.findOpponents(search).subscribe(data => {
      if(data.success) {
        console.log(data.users);
        this.router.navigate(['/search']);
      } else {
        console.log('Something went wrong. Please try again later.');
      }
    });

  }
}
