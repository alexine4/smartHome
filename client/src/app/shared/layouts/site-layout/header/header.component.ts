import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { RoomService } from 'src/app/shared/services/room.service';
import { ToastrService } from 'ngx-toastr';
import { roomAndType } from 'src/app/shared/interfaces';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUrl!: string
  Rooms:roomAndType[] =[]

  roomSub$!: Subscription

  constructor(
    private location: Location,
    private toast: ToastrService,
    private roomServise: RoomService,
    private  title: Title
  ) {
    this.currentUrl = this.location.path();
  }

  ngOnInit(): void {
      this.roomSub$ = this.roomServise.fetch().subscribe(
      room => {  
        this.Rooms.push(room)
      },
      error => {
        this.toast.error(error.message)
      },
      () => {

      }
    ) 
  }

  newcurrentUrl(newcurrentUrl: string,title:string) {
    this.currentUrl = newcurrentUrl;
    this.title.setTitle(title)
  }


}
