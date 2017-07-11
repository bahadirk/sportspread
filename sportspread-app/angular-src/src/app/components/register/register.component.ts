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

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private router: Router,
              private flashMessagesModule: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

      // Required Fields
      if(!this.validateService.validateRegister(user)) {
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

  }

}
