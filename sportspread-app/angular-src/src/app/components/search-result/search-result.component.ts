import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})

export class SearchResultComponent implements OnInit {
   searchType: any;
   type_account: any;
   users: [any];
   team: any;

   constructor(
     private route: ActivatedRoute,
     private router: Router,
     private searchService: SearchService,
     private authService: AuthService,
     private flashMessagesModule: FlashMessagesService
   ) {}

  ngOnInit() {
    this.authService.getTeamProfile().subscribe(profile => {
        this.team = profile.team;
      },
      err => {
        console.log(err);
        return false;
      });

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
         case "Instructor": {
           this.searchService.findTeamInstructor(search).subscribe(data => {
             if (data.success) {
               console.log(data);
               this.users = data.users;
             } else {
               console.log('Something went wrong. Please try again later.');
             }
           });
           break;
         }
         case "Teammate": {
           this.searchService.findTeammembers(search).subscribe(data => {
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

  onAddMember(item){
     if(this.team.members.User) {
       this.team.members.User.push(item);
     } else {
       this.team.members.User = [];
       this.team.members.User.push(item);
     }
    console.log(this.team);
    // Update Team
    this.authService.updateTeamProfile(this.team).subscribe(data => {
      if(data.success) {
        this.flashMessagesModule.show('You have updated your team profile.', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessagesModule.show('Something went wrong. Please try again later.', {cssClass: 'alert-danger', timeout: 3000});
      }
    });

  }

}
