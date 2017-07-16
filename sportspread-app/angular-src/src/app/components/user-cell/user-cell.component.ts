import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-cell',
  templateUrl: './user-cell.component.html',
  styleUrls: ['./user-cell.component.css']
})
export class UserCellComponent implements OnInit {

  @Input() user: any;

  constructor() { }

  ngOnInit() {
  }


}
