import { Component, OnInit, Input, NgModule, ViewChild, NgZone, ElementRef} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
declare var google: any;

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})


export class SearchResultComponent implements OnInit {
   public latitude: number;
   public longitude: number;
   public searchControl: FormControl;
   public zoom: number;

   @ViewChild("search")
   public searchElementRef: ElementRef;

   constructor(
     private mapsAPILoader: MapsAPILoader,
     private ngZone: NgZone
   ) {}

  ngOnInit() {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
         let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
           types: ["address"]
         });
         autocomplete.addListener("place_changed", () => {
                  this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                      return;
                    }
                    this.latitude = place.geometry.location.lat();
                               this.longitude = place.geometry.location.lng();
                               this.zoom = 12;
        });
      });
    });



}
}
