import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  teamname: String;
  password: String;
  accountType = "Personal";

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessagesModule: FlashMessagesService
  ) { }

  changeAccountType(type) {
    this.accountType = type;
  }

  ngOnInit() {
  }

  onLoginSubmit() {

    switch(this.accountType) {
      case "Personal": {
        const user = {
          username: this.username,
          password: this.password
        }

        this.authService.authenticateUser(user).subscribe(data => {
          if(data.success){
            this.authService.storeUserData(data.token, data.user);
            this.flashMessagesModule.show('You are now logged in.', {
              cssClass: 'alert-success',
              timeout: 5000
            });
            this.router.navigate(['home']);
          } else {
            this.flashMessagesModule.show(data.msg, {
              cssClass: 'alert-danger',
              timeout: 5000
            });
            this.router.navigate(['login']);
          }
        });
        break;
      }
      case "Team": {
        const team = {
          teamname: this.teamname,
          password: this.password
        }
        this.authService.authenticateTeam(team).subscribe(data => {
          if(data.success){
            this.authService.storeTeamData(data.token, data.team);
            this.flashMessagesModule.show('You are now logged in.', {
              cssClass: 'alert-success',
              timeout: 5000
            });
            this.router.navigate(['home']);
          } else {
            this.flashMessagesModule.show(data.msg, {
              cssClass: 'alert-danger',
              timeout: 5000
            });
            this.router.navigate(['login']);
          }
        });
        break;
      }
    }

  }

}
