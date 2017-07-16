import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})


export class SearchResultComponent implements OnInit {

  lat: number = 51.678418;
  lng: number = 7.809007;
  sport_name: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const search = {
        sport_name: params['sport'],
        experience: params['location'],
        location: params['experience']
      }
console.log(search);
      this.searchService.findOpponents(search).subscribe(data => {
        if(data.success) {
          console.log(data);
        } else {
          console.log('Something went wrong. Please try again later.');
        }
      });
    });
  }
}
