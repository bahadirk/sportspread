import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  type_account: any;
  constructor(private authService: AuthService,
              private router: Router,
              private flashMessagesModule: FlashMessagesService
  ) { }

  ngOnInit() {
    this.type_account = localStorage.getItem('profile');
    this.type_account = JSON.parse(this.type_account).type_account;
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessagesModule.show('You are logged out.', {
      cssClass: 'alert-success',
      timeout: 3000
    });
    this.router.navigate(['login']);
    return false;
  }
}
