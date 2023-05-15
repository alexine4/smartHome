import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { RoomService } from 'src/app/shared/services/room.service';
import { ToastrService } from 'ngx-toastr';
import { Room } from 'src/app/shared/interfaces';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUrl!: string
  Rooms!:Room[]

  roomSub$!: Subscription

  constructor(
    private location: Location,
    private toast: ToastrService,
    private roomServise: RoomService
  ) {
    this.currentUrl = this.location.path();
  }

  ngOnInit(): void {
    this.roomSub$ = this.roomServise.fetch().subscribe(
      rooms => {
        this.Rooms = rooms;       
      },
      error => {
        this.toast.error(error.error.message)
      },
      () => {

      }
    )
  }

  newcurrentUrl(newcurrentUrl: string) {
    this.currentUrl = newcurrentUrl;
  }


}
