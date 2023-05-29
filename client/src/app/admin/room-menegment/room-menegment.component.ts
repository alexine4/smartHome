import { RoomService } from 'src/app/shared/services/room.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Subscription, } from 'rxjs';
import { Room, Type, roomAndType } from 'src/app/shared/interfaces';
import { ToastrService } from 'ngx-toastr';
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

  rooms: roomAndType[] = []

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
        this.roomForm.enable()
        this.types = Types
      },
      error => this.toast.error(error.error.massege)
    )
    //fetch all rooms
    this.fetchRooms()


  }
  // function fetch rooms with type
  private fetchRooms(): void {
    this.roomService.fetchWithType().subscribe(
      room => {
        this.loading = true
        this.rooms.push(room)
      },
      error => this.toast.error(error.error.massege)
    )
  }
  // function take rooms and type from list 
  public takeRoom(roomName: string, typeName: string): void {
    if (this.roomForm.value.newRoomName !=='') {
      this.roomForm.setValue({ roomName, typeName, newRoomName: this.roomForm.value.newRoomName })
    }else{
      this.roomForm.setValue({ roomName, typeName, newRoomName: roomName })
    }
  }
  // function create new room
  public createRoom(): void {
    //disable form
    this.roomForm.disable()
    
    // new room
    let newRoom!: Room;
    let roomPush!: roomAndType;
    const type = this.takeTypeByName(this.roomForm.value.typeName)
    // check if type exist
    if (type) {
      // add new data to variable
      newRoom = {
        roomId: 0,
        roomName: this.roomForm.value.roomName,
        typeId: type.typeId,
        newRoomName: this.roomForm.value.newRoomName
      }
      roomPush = {
        roomId: 0,
        roomName: this.roomForm.value.roomName,
        typeId: newRoom.typeId,
        typeName: type.typeName
      }
    }
    // create new sub on creating new room
    this.createSub$ = this.roomService.create(newRoom).subscribe(
      answer => {
        this.rooms.push(roomPush)
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

  // update room
  public updateRoom(): void {
    // form disable
    this.roomForm.disable()
    // take type by name
    const type = this.takeTypeByName(this.roomForm.value.typeName)
    // take room by name
    const room = this.rooms.find(room => {
      return room.roomName === this.roomForm.value.roomName
    })
    // create new var
    let newRoom!: Room
    if(type &&room){
      newRoom={
        roomId:room.roomId,
        roomName: this.roomForm.value.roomName,
        typeId: type.typeId,
        newRoomName: this.roomForm.value.newRoomName
      }
    } 
    // update on subsrubing   
    this.updateSub$ = this.roomService.update(newRoom).subscribe(
    message=>{
    //update element into array
    this.rooms=[]
    this.fetchRooms()
    this.toast.success(message.message)
    },
    error=>{
    this.roomForm.enable()
     this.toast.error(error.error.message)
    },
    ()=>{
    this.roomForm.enable()
    }
    )
  }
  //delete room
  public deleteRoom(): void {
    this.roomForm.disable()
    const room = this.rooms.find(room => {
      return room.roomName === this.roomForm.value.roomName
    })
    if (room) {
      this.deleteSub$ = this.roomService.delete(room.roomId).subscribe(
      message=>{
        //delete element from array
      this.rooms = this.rooms.filter(item => item['roomId'] !== room.roomId);
      this.toast.success(message.message)
      },
      error=>{
      this.roomForm.enable()
      this.toast.error(error.error.message)
      },
      ()=>{
      this.roomForm.enable()
      }
      )
    }
    
  }
  // take type by name from array
  private takeTypeByName(typeName: string): Type |undefined {
    const type = this.types.find(type => {
      return type.typeName === typeName
    })
      return type
    }
  //unsubscribing all 
  ngOnDestroy(): void {
    if (this.createSub$) {
      this.createSub$.unsubscribe()
    }
    if(this.typeSub$){
      this.typeSub$.unsubscribe()
    }
    if (this.deleteSub$) {
      this.deleteSub$.unsubscribe()
    }
  }
}
