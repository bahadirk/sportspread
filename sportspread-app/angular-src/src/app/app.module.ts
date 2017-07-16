import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Jsonp, Response } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchResultComponent } from './components/search-result/search-result.component'

import { ValidateService } from './services/validate.service';
import { DataService } from './services/data.service';
import { SearchService } from './services/search.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { InterestComponent } from './components/interest/interest.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  //{path: 'search', component: SearchResultComponent, canActivate:[AuthGuard]}

  {
    path: 'search/:sport/:location/:experience',
    component: SearchResultComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    FooterComponent,
    SearchResultComponent,
    InterestComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB5oqtbEdUtP1TmVDXf3PWEwUh05x7R6uc',
      libraries: ["places"]
    })
  ],
  providers: [ValidateService, AuthService, AuthGuard, SearchService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
