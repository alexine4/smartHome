import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { RoomService } from 'src/app/shared/services/room.service';
import { ToastrService } from 'ngx-toastr';
import { roomAndType } from 'src/app/shared/interfaces';
import { Title } from '@angular/platform-browser';
import { MenuService } from 'src/app/shared/services/menu.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  windowHeight!: number;
  roomsShow = false
  managementShow = false
  adminShow = true

  Rooms: roomAndType[] = []

  roomSub$!: Subscription

  constructor(
    private location: Location,
    private toast: ToastrService,
    private roomServise: RoomService,
    private title: Title,
    public menuService: MenuService
  ) {
    this.menuService.currentURL = this.location.path();
  }

  ngOnInit(): void {
    this.roomSub$ = this.roomServise.fetchWithType().subscribe(
      room => {
        this.Rooms.push(room)
      },
      error => {
        this.toast.error(error.message)
      },
      () => {

      }
    )
    // run check function
    this.checkMenuForScroll(false)


  }

  public newcurrentUrl( newcurrentUrl: string, title: string) {
    this.menuService.menuStatus = false
    this.menuService.currentURL = newcurrentUrl;
    this.title.setTitle(title)
  }

  public checkMenuForScroll(status: boolean) {
    //check window height
    // and add scroll if menu height biggest then window height 
    this.windowHeight = window.innerHeight;
    const sections = document.querySelector('.menu__sections')
    const menuCont = document.getElementById('menu')
    if (sections && menuCont) {
      let heightElem
      //check open or close menu
      if (status) {
        heightElem = sections.clientHeight + 229
      } else {
        heightElem = sections.clientHeight - 229
      }
      if (this.windowHeight < heightElem) {
        menuCont.style.overflowY = 'scroll'
      } else {
        menuCont.style.overflowY = 'hidden'
      }
    }
  }
  



}
