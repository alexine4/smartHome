import { MenuService } from 'src/app/shared/services/menu.service';
import { Component, OnInit } from '@angular/core';
import { RoomService } from '../shared/services/room.service';
import { Subscription } from 'rxjs';
import { roomAndType } from '../shared/interfaces';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUrl!: string
  roomSub$!: Subscription
  rooms: roomAndType[] = []
  loading = false

  constructor (
    private roomService: RoomService,
    private menuService:MenuService,
    private title: Title,
  ){

  }
  ngOnInit(): void {
    
    this.roomSub$ = this.roomService.fetchWithType().subscribe(
      room=>{
        this.rooms.push(room)
        this.loading = true
      }
    )
  }
  public newcurrentUrl( newcurrentUrl: string, title: string) {
    this.menuService.currentURL = newcurrentUrl;
    this.title.setTitle(title)
  }
}
