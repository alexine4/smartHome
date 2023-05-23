import { Component, OnInit } from '@angular/core';
import { RoomService } from '../shared/services/room.service';
import { Subscription } from 'rxjs';
import { roomAndType } from '../shared/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  roomSub$!: Subscription
  rooms: roomAndType[] = []
  loading = false

  constructor (
    private roomService: RoomService
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
}
