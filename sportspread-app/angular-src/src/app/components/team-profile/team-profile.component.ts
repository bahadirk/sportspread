import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.css']
})
export class TeamProfileComponent implements OnInit {

  password: String;
  passwordRepeat: String;
  team: any;
  myForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private validateService: ValidateService,
              private flashMessagesModule: FlashMessagesService,
              private fb: FormBuilder,
              private el: ElementRef,
              private http: Http,
  ) { }

  ngOnInit() {

    let newForm = this.fb.group({
      appearsOnce: ['InitialValue'],
      formArray: this.fb.array([])
    });

    const arrayControl = <FormArray>newForm.controls['formArray'];
    this.authService.getTeamProfile().subscribe(profile => {
        this.team = profile.team;
  console.log(this.team);

        this.team.members.forEach(item => {
          let newGroup = this.fb.group({
            name: [item.name, [Validators.required]],
            email: [item.email, [Validators.required]]
          });
          arrayControl.push(newGroup);
        });

        this.myForm = newForm;
      },
      err => {
        console.log(err);
        return false;
      });
  }
  deleteInput(index: number): void {
    const arrayControl = <FormArray>this.myForm.controls['formArray'];
    arrayControl.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.myForm.value);
    // Your form value is outputted as a JavaScript object.
    // Parse it as JSON or take the values necessary to use as you like
  }

  onProfileSubmit(){
    this.team.members = [];

    this.myForm.value.formArray.forEach(item => {
      this.team.members.push(item);
    });

    if(this.password != undefined || this.passwordRepeat != undefined) {
      if(this.password == this.passwordRepeat) {
        this.team.password = this.password;
      } else {
        this.flashMessagesModule.show("Passwords do not match.", {cssClass: 'alert-danger', timeout: 3000});
        return false;
      }
    }

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
