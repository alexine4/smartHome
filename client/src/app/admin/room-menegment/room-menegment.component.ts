import { RoomService } from 'src/app/shared/services/room.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Room } from 'src/app/shared/interfaces';
import { ToastrService } from 'ngx-toastr';
import { minNumber } from 'src/app/shared/validators/minNumber-validator';

@Component({
  selector: 'app-room-menegment',
  templateUrl: './room-menegment.component.html',
  styleUrls: ['./room-menegment.component.scss']
})
export class RoomMenegmentComponent implements OnInit, OnDestroy {

  loading = false

  rooms$!: Observable<Room[]>

  createSub$!: Subscription
  updateSub$!: Subscription
  deleteSub$!: Subscription
  roomForm!: FormGroup

  constructor( 
    private roomService:RoomService,
    private toast: ToastrService
  ){}
  ngOnInit(): void {
    // room from init
    this.roomForm = new FormGroup({
      roomName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      typeId: new FormControl('', [Validators.required, minNumber(0)]),
      newRoomName: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }
  takeName(){ }
  public createRoom(): void {}
  public updateRoom(): void{}
  public deleteRoom(): void{}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
