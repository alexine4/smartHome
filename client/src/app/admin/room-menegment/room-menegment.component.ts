import { RoomService } from 'src/app/shared/services/room.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription, concatMap, of, toArray } from 'rxjs';
import { Room, Type, roomAndType } from 'src/app/shared/interfaces';
import { ToastrService } from 'ngx-toastr';
import { minNumber } from 'src/app/shared/validators/minNumber-validator';
import { TypeService } from 'src/app/shared/services/type.service';

@Component({
  selector: 'app-room-menegment',
  templateUrl: './room-menegment.component.html',
  styleUrls: ['./room-menegment.component.scss']
})
export class RoomMenegmentComponent implements OnInit, OnDestroy {

  loading = false
  loadType = false
  types!: Type[]

  rooms$!: Observable<roomAndType[]>

  typeSub$!: Subscription
  createSub$!: Subscription
  updateSub$!: Subscription
  deleteSub$!: Subscription
  roomForm!: FormGroup

  constructor(
    private roomService: RoomService,
    private typeService: TypeService,
    private toast: ToastrService
  ) { }
  ngOnInit(): void {
    // room from init
    this.roomForm = new FormGroup({
      roomName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      typeName: new FormControl('', [Validators.required]),
      newRoomName: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
    this.roomForm.disable()
    //fetch all types
    this.typeSub$ = this.typeService.fetchAll().subscribe(
      Types => {
        this.types = Types
      },
      error => this.toast.error(error.error.massege),
      () => {
        this.roomForm.enable()
      }
    )
    //fetch all rooms
    this.fetchRooms()


  }
  // function fetch rooms with type
  private fetchRooms(): void {
    
  

    
  }
  // function take rooms and type from list 
  public takeRoom(roomName: string, typeName: string): void {
    this.roomForm.setValue({ roomName, typeName, newRoomName: this.roomForm.value.newRoomName })
  }
  // function create new room
  public createRoom(): void {
    //disable form
    this.roomForm.disable()
    // take type by name from array
    const typeId = this.types.find(type => {
      return type.typeName === this.roomForm.value.typeName
    })
    // new room
    let newRoom!: Room;
    // check if type exist
    if (typeId) {
      // add new data to variable
      newRoom = {
        roomId: 0,
        roomName: this.roomForm.value.roomName,
        typeId: typeId.typeId,
        newRoomName: this.roomForm.value.newRoomName
      }
    }
    // create new sub on creating new room
    this.createSub$ = this.roomService.create(newRoom).subscribe(
      answer => {
        this.fetchRooms()
        this.toast.success(answer.message)
      },
      error => {
        this.roomForm.enable()
        this.toast.error(error.error.message)
      },
      () => {
        this.roomForm.enable()
      }
    )
  }


  public updateRoom(): void { }
  public deleteRoom(): void { }
  ngOnDestroy(): void {

  }
}
