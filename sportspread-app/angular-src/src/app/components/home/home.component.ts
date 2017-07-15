import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  sport_name : String;

  constructor() { }

  ngOnInit() {
  }

  onSearch(){
    const search = {
      sport_name: this.sport_name,
    }
  }

}
