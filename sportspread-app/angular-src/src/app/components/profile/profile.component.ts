import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  name: String;
  username: String;
  email: String;
  password: String;
  location: String;
  interests: any;

  constructor(private authService: AuthService,
              private router: Router,
              private validateService: ValidateService,
              private flashMessagesModule: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onProfileSubmit(){

    // Required Fields
    if(!this.validateService.validateRegister(this.user)) {
      this.flashMessagesModule.show('Please fill in all fields.', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(this.user.email)) {
      this.flashMessagesModule.show('Please use a valid email.', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Update User
    this.authService.updateProfile(this.user).subscribe(data => {
      if(data.success) {
        this.flashMessagesModule.show('You have updated your profile.', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/profile']);
      } else {
        this.flashMessagesModule.show('Something went wrong. Please try again later.', {cssClass: 'alert-danger', timeout: 3000});
      }
    });

  }

}
