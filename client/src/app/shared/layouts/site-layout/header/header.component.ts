import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUrl!: string;


  constructor(
    private location: Location
  ) {
    this.currentUrl = this.location.path();
  }

  ngOnInit(): void {
    console.log(this.currentUrl);
  }

  newcurrentUrl (newcurrentUrl: string){
        this.currentUrl = newcurrentUrl;
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
