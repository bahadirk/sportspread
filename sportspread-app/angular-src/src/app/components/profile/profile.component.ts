import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

const URL = 'http://localhost:8000/api/upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  password: String;
  passwordRepeat: String;
  user: any;
  myForm: FormGroup;

  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  constructor(private authService: AuthService,
              private router: Router,
              private validateService: ValidateService,
              private flashMessagesModule: FlashMessagesService,
              private fb: FormBuilder,
              private el: ElementRef,
              private http: Http,
  ) { }

  ngOnInit() {

    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };

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

  upload() {
    //locate the file element meant for the file upload.
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    //get the total amount of files attached to the file input.
    let fileCount: number = inputEl.files.length;
    //create a new fromdata instance
    let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
    if (fileCount > 0) { // a file was selected
      //append the key name 'photo' with the first file in the element
      formData.append('photo', inputEl.files.item(0));
      //call the angular http method
      this.http.post(URL, formData).map((res:Response) => res.json()).subscribe(
        //map the success function and alert the response
        (success) => {
          alert(success._body);
        },
        (error) => alert(error))
    }
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

    if(this.password != undefined || this.passwordRepeat != undefined) {
      if(this.password == this.passwordRepeat) {
        this.user.password = this.password;
      } else {
        this.flashMessagesModule.show("Passwords do not match.", {cssClass: 'alert-danger', timeout: 3000});
        return false;
      }
    }

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
