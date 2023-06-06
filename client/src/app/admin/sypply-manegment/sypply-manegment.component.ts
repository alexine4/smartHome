import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { roomAndType, Room, Type, Sypply } from 'src/app/shared/interfaces';
import { RoomService } from 'src/app/shared/services/room.service';
import { SypplyService } from 'src/app/shared/services/sypply.service';
import { TypeService } from 'src/app/shared/services/type.service';

@Component({
  selector: 'app-sypply-manegment',
  templateUrl: './sypply-manegment.component.html',
  styleUrls: ['./sypply-manegment.component.scss']
})
export class SypplyManegmentComponent {

  loading = false
  loadType = false
  types!: Type[]

  sypplies: Sypply[] = []

  typeSub$!: Subscription
  createSub$!: Subscription
  updateSub$!: Subscription
  deleteSub$!: Subscription
  sypplyForm!: FormGroup

  constructor(
    private sypplyService: SypplyService,
    private typeService: TypeService,
    private toast: ToastrService
  ) { }
  ngOnInit(): void {
    // room from init
    this.sypplyForm = new FormGroup({
      sypplyName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      sypplyType: new FormControl('', [Validators.required, Validators.minLength(1)]),
      status: new FormControl('Enabled', [Validators.required]),
      tarif: new FormControl(null, [Validators.required, Validators.min(0)]),
      sypplyAccount: new FormControl(null, [Validators.required, Validators.pattern(/^\d{10}$/)])
    })

    this.sypplyForm.disable()
    //fetch all types
    this.typeSub$ = this.typeService.fetchAll().subscribe(
      Types => {
        this.sypplyForm.enable()
        this.types = Types
      },
      error => this.toast.error(error.error.massege)
    )
    //fetch all rooms
    this.fetchSypplies()


  }




  // function fetch rooms with type
  private fetchSypplies(): void {
    this.sypplyService.fetchAll().subscribe(
      sypplies => {
        this.sypplies = sypplies
        this.loading = true
      },
      error => this.toast.error(error.error.massege)
    )
  }
  // function take rooms and type from list 
  public takeRoom(roomName: string, typeName: string): void {
    if (this.sypplyForm.value.newRoomName !== '') {
      this.sypplyForm.setValue({ roomName, typeName, newRoomName: this.sypplyForm.value.newRoomName })
    } else {
      this.sypplyForm.setValue({ roomName, typeName, newRoomName: roomName })
    }
  }
  // function create new room
  public createSypply(): void {
 
    
    //disable form
    this.sypplyForm.disable()
    const newSypply = this.sypplyForm.value
    newSypply.status = this.sypplyForm.value==='Enabled'?true:false
    console.log(newSypply);
    // create new sub on creating new room
    this.createSub$ = this.sypplyService.create(newSypply).subscribe(
      answer => {
        this.sypplies.push(newSypply)
        this.toast.success(answer.message)
      },
      error => {
        this.sypplyForm.enable()
        this.toast.error(error.error.message)
      },
      () => {
        this.sypplyForm.enable()
      }
    )
  }

  /*   // update room
    public updateRoom(): void {
      // form disable
      this.sypplyForm.disable()
      // take type by name
      const type = this.takeTypeByName(this.sypplyForm.value.typeName)
      // take room by name
      const room = this.rooms.find(room => {
        return room.roomName === this.sypplyForm.value.roomName
      })
      // create new var
      let newRoom!: Room
      if(type &&room){
        newRoom={
          roomId:room.roomId,
          roomName: this.sypplyForm.value.roomName,
          typeId: type.typeId,
          newRoomName: this.sypplyForm.value.newRoomName
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
      this.sypplyForm.enable()
       this.toast.error(error.error.message)
      },
      ()=>{
      this.sypplyForm.enable()
      }
      )
    }
    //delete room
    public deleteRoom(): void {
      this.sypplyForm.disable()
      const room = this.rooms.find(room => {
        return room.roomName === this.sypplyForm.value.roomName
      })
      if (room) {
        this.deleteSub$ = this.roomService.delete(room.roomId).subscribe(
        message=>{
          //delete element from array
        this.rooms = this.rooms.filter(item => item['roomId'] !== room.roomId);
        this.toast.success(message.message)
        },
        error=>{
        this.sypplyForm.enable()
        this.toast.error(error.error.message)
        },
        ()=>{
        this.sypplyForm.enable()
        }
        )
      }
      
    } */
  // take type by name from array
  private takeTypeByName(typeName: string): Type | undefined {
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
    if (this.typeSub$) {
      this.typeSub$.unsubscribe()
    }
    if (this.deleteSub$) {
      this.deleteSub$.unsubscribe()
    }
  }
}
