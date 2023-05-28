import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TemperatureService } from '../shared/services/temperature.service';
import { Temperature } from '../shared/interfaces';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  loading = false

  tempSub$!:Subscription
  temp!: Temperature

constructor(
  private tempService: TemperatureService,
  private toast:ToastrService
){}

public ngOnInit(): void {
  
  this.tempSub$ = this.tempService.fetchById(1).subscribe(
  Temp=>{
  this.temp = Temp
  this.loading= true
  },
  error=>{
   this.toast.error(error.error.message)
  },
  ()=>{
  }
  )
}

public ngOnDestroy(): void {
  
}
}
