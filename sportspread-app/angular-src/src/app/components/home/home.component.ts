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
 

  constructor(private searchService: SearchService,
              private router: Router,
  ) { }

  ngOnInit() {
  }

  onSearch(){
    console.log(123);
    
    const search = {
        sport_name: this.sport_name,
    }
     
    this.searchService.findUsers(search);
    this.router.navigate(['/search']);
  }
}
