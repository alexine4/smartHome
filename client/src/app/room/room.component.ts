import { Observable } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, of, switchMap } from 'rxjs';
import { TemperatureService } from '../shared/services/temperature.service';
import { Temperature } from '../shared/interfaces';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  loading = false

  temp$!: Observable<Temperature | null>
  tempSub$!: Subscription
  temp!: Temperature | null

  pRoomId!:number

  constructor(
    private route: ActivatedRoute,
    private tempService: TemperatureService,
    private toast: ToastrService
  ) { }

  public ngOnInit(): void {
    this.getTemp()
    this.loading = false
    this.tempSub$= this.temp$.subscribe(
      Temp=>{
        this.temp= Temp
        this.loading = true
      }
    )
  }

  public getTemp(): void {
    
    this.temp$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['roomId']) {
            if (this.pRoomId !== params['roomId']) {
              this.loading = false
            }
            this.pRoomId = params['roomId']
            return this.tempService.fetchByRoom(params['roomId'])
          }
          return of(null)
        })
      )
  }

  public ngOnDestroy(): void {
    if (this.tempSub$) {
      this.tempSub$.unsubscribe()
    }
  }
}
