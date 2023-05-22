import { Component, OnInit } from '@angular/core';
import { RoomService } from '../shared/services/room.service';
import { Observable, Subscription } from 'rxjs';
import { roomAndType } from '../shared/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  roomSub$!: Subscription
  rooms: roomAndType[] = []
  loading = true

  constructor (
    private roomService: RoomService
  ){

  }
  ngOnInit(): void {
    
    this.roomSub$ = this.roomService.fetchWithType().subscribe(
      room=>{
        this.rooms.push(room)
        this.loading = false
      }
    )

  }
}
