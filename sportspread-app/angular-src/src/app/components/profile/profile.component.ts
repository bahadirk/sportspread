import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {  FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  myForm: FormGroup;
  name: String;
  interests = [
      {
      "name": "basketball",
      "level": "medium"
      },
      {
        "name": "football",
        "level": "advanced"
      }
    ];

  constructor(private authService: AuthService,
              private router: Router,
              private validateService: ValidateService,
              private flashMessagesModule: FlashMessagesService,
              private fb: FormBuilder
  ) { }

  ngOnInit() {
    let newForm = this.fb.group({
      appearsOnce: ['InitialValue'],
      formArray: this.fb.array([])
    });

    const arrayControl = <FormArray>newForm.controls['formArray'];
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;

      this.user.interests.forEach(item => {
        let newGroup = this.fb.group({
          name: [item.name, [Validators.required]],
          level: [item.level, [Validators.required]]
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

  addInput(): void {
    const arrayControl = <FormArray>this.myForm.controls['formArray'];
    let newGroup = this.fb.group({
      // Fill this in identically to the one in ngOnInit
      name: ["", [Validators.required]],
      level: ["", [Validators.required]]
    });
    arrayControl.push(newGroup);
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
    this.user.interests = [];
    this.myForm.value.formArray.forEach(item => {
      this.user.interests.push(item);
    });

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
      } else {
        this.flashMessagesModule.show('Something went wrong. Please try again later.', {cssClass: 'alert-danger', timeout: 3000});
      }
    });

  }

}
