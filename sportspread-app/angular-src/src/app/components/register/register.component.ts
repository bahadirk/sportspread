import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  sport_name: String;
  level: String;
  name: String;
  username: String;
  teamname: String;
  email: String;
  password: String;
  accountType = "Personal";
  instructor;
  sports_prof;

  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private router: Router,
              private flashMessagesModule: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  changeAccountType(type) {
    this.accountType = type;
  }

  onRegisterSubmit(){

    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      is_instructor: "",
      sports_prof: ""
    }

    switch(this.accountType) {
      case "Personal": {
        if(this.instructor) {
         user.is_instructor = this.instructor;
         user.sports_prof = this.sports_prof
        }

        // Required Fields
        if(!this.validateService.validatePersonalRegister(user)) {
          this.flashMessagesModule.show('Please fill in all fields.', {cssClass: 'alert-danger', timeout: 3000});
          return false;
        }

        // Validate Email
        if(!this.validateService.validateEmail(user.email)) {
          this.flashMessagesModule.show('Please use a valid email.', {cssClass: 'alert-danger', timeout: 3000});
          return false;
        }

        // Register User
        this.authService.registerUser(user).subscribe(data => {
          if(data.success) {
            this.flashMessagesModule.show('You are now registered. Please log in.', {cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['/login']);
          } else {
            this.flashMessagesModule.show('Something went wrong. Please try again later.', {cssClass: 'alert-danger', timeout: 3000});
          }
        });
        break;
      }
      case "Team": {
        const team = {
          sport_name: this.sport_name,
          teamname: this.teamname,
          level: this.level,
          password: this.password,
          users: []
        }
        // Required Fields
       /* if(!this.validateService.validateTeamRegister(team)) {
          this.flashMessagesModule.show('Please fill in all fields.', {cssClass: 'alert-danger', timeout: 3000});
          return false;
        }*/

        // Register Team
        this.authService.registerTeam(team).subscribe(data => {
          if(data.success) {
            this.flashMessagesModule.show('You are now registered. Please log in.', {cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['/login']);
          } else {
            this.flashMessagesModule.show('Something went wrong. Please try again later.', {cssClass: 'alert-danger', timeout: 3000});
          }
        });
        break;
      }
    }
  }

}
