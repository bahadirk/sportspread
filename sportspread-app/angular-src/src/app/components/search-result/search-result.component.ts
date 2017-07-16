import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})

export class SearchResultComponent implements OnInit {
   searchType: any;
   type_account: any;
   users: [any];

   constructor(
     private route: ActivatedRoute,
     private router: Router,
     private searchService: SearchService
   ) {}

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.searchType = params['searchType'];
      this.type_account = params['type_account'];
      const search = {
        sport_name: params['sport'],
        experience: params['experience'],
        location: params['location']
      }

     if(this.type_account == "team"){

       switch (this.searchType) {
         case "Opponent": {
           this.searchService.findOpponentTeam(search).subscribe(data => {
             if (data.success) {
               console.log(data);
               this.users = data.users;
             } else {
               console.log('Something went wrong. Please try again later.');
             }
           });
           break;
         }
       }

     }else{
       switch (this.searchType) {
         case "Teammate": {
           this.searchService.findTeammates(search).subscribe(data => {
             if (data.success) {
               console.log(data);
               this.users = data.users;
             } else {
               console.log('Something went wrong. Please try again later.');
             }
           });
           break;
         }
         case "Opponent": {
           this.searchService.findOpponents(search).subscribe(data => {
             if (data.success) {
               console.log(data);
               this.users = data.users;
             } else {
               console.log('Something went wrong. Please try again later.');
             }
           });
           break;
         }
         case "Instructor": {
           console.log(search);
           this.searchService.findInstructors(search).subscribe(data => {
             if (data.success) {
               this.users = data.users;
             } else {
               console.log('Something went wrong. Please try again later.');
             }
           });
           break;
         }
       }
     }

    });
  }
}
