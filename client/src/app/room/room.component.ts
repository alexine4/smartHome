import { Observable } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, of, switchMap } from 'rxjs';
import { TemperatureService } from '../shared/services/temperature.service';
import { ScenarionTemp, Temperature } from '../shared/interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { ScenarioTempService } from '../shared/services/scenario-temp.service';
import { MatDialog } from '@angular/material/dialog';
import { ScenarioTempComponent } from '../shared/modules/scenario-temp/scenario-temp.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  tempLoader = false
  scenarioTempLoader = false

  scenarioTemp$!: Observable<ScenarionTemp[] | null>
  scenarioTempSub$!: Subscription
  scenarioTemps!: ScenarionTemp[] | null

  temp$!: Observable<Temperature | null>
  tempSub$!: Subscription
  temp!: Temperature | null

  pRoomId!:number

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private scenarioTempService: ScenarioTempService,
    private tempService: TemperatureService,
    private toast: ToastrService
  ) { }

  public ngOnInit(): void {
    // getting actual temperature
    this.getTemp()
    this.tempSub$= this.temp$.subscribe(
      Temp=>{
        this.temp= Temp
        this.tempLoader = true
      }
    )
    // getting all scenarios of temperature for active room
    this.getScenarioTemp()
    this.scenarioTempSub$= this.scenarioTemp$.subscribe(
      ScenarioTemp=>{
        this.scenarioTemps= ScenarioTemp
        this.scenarioTempLoader = true
      }
    )
    //

  }

  //get actual temperature by room
  public getTemp(): void {
    
    this.temp$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['roomId']) {
            if (this.pRoomId !== params['roomId']) {
              this.tempLoader = false
            }
            this.pRoomId = params['roomId'] 
            return this.tempService.fetchByRoom(params['roomId'])
          }
          return of(null)
        })
      )
  }

  //get scenarios of temperature by room
  public getScenarioTemp(): void {
    this.scenarioTemp$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['roomId']) {
            if (this.pRoomId !== params['roomId']) {
              this.scenarioTempLoader = false
            }
            this.pRoomId = params['roomId']
            return this.scenarioTempService.fetchByRoom(params['roomId'])
          }
          return of(null)
        })
      )
  }

  public addNewScenarioTemp():void{
    const dialogRef = this.dialog.open(ScenarioTempComponent, {
      data: {
        roomId: this.pRoomId,
        name: ''
      },
      enterAnimationDuration: '1.5s',
      exitAnimationDuration: '1.5s',
    })
  }
  public updateScenarioTemp(scenarioTemp: ScenarionTemp):void{
    const dialogRef = this.dialog.open(ScenarioTempComponent, {
      data: scenarioTemp,
      enterAnimationDuration: '1.5s',
      exitAnimationDuration: '1.5s',
    })
  }

  public ngOnDestroy(): void {
    if (this.tempSub$) {
      this.tempSub$.unsubscribe()
    }
  }
}
