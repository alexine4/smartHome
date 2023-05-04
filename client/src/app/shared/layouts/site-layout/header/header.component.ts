import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
  currentUrl!: string;


  constructor(
    private location: Location
  ) {
    this.currentUrl = this.location.path();
  }

  

  newcurrentUrl (newcurrentUrl: string){
        this.currentUrl = newcurrentUrl;
  }
 

}
