import { Observable } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, of, switchMap } from 'rxjs';
import { TemperatureService } from '../shared/services/temperature.service';
import { Accessory, ScenarionTemp, Temperature } from '../shared/interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { ScenarioTempService } from '../shared/services/scenario-temp.service';
import { MatDialog } from '@angular/material/dialog';
import { ScenarioTempComponent } from '../shared/modules/scenario-temp/scenario-temp.component';
import { TemperatureReguletedComponent } from '../shared/modules/temperature-reguleted/temperature-reguleted.component';
import { AccessoryManegmentComponent } from '../shared/modules/accessory-manegment/accessory-manegment.component';
import { AccessoryService } from '../shared/services/accessory.service';
import { MenuService } from '../shared/services/menu.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  // loader var
  tempLoader: boolean = false
  tempScenarioLoader: boolean = false
  scenarioTempLoader: boolean = false
  accessoryLoader: boolean = false

  // dialog windows variables
  dialogSub$!: Subscription

  //accessory variables
  accesories!: Accessory[]
  accessorySub$!: Subscription

  //scenario variables
  scenarioTemp$!: Observable<ScenarionTemp[] | null>
  scenarioTempSub$!: Subscription
  scenarioTemps!: ScenarionTemp[] | null
  scenarioActualTemp$!: Observable<ScenarionTemp | null>
  actualScenario!: ScenarionTemp | null

  //temperature variables
  temp$!: Observable<Temperature | null>
  tempSub$!: Subscription
  temp!: Temperature | null
  pRoomId!: number


  constructor(
    private accessoryService: AccessoryService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private scenarioTempService: ScenarioTempService,
    private tempService: TemperatureService,
    private toast: ToastrService
  ) { }

  public ngOnInit(): void {
    // getting actual temperature
    this.getTemp()

  }

  //get actual temperature by room
  public getTemp(): void {
    this.temp$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['roomId']) {
            this.tempLoader = false
            this.pRoomId = params['roomId']
            return this.tempService.fetchByRoom(params['roomId'])
          }
          return of(null)
        })
      )
    this.tempSub$ = this.temp$.subscribe(
      Temp => {
        this.temp = Temp
        this.tempLoader = true
        //loaders to false for working of change room 
        this.tempScenarioLoader = false
      
       
        // getting all scenarios of temperature for active room
        this.getScenarioTemp()
        // getting active scenario of temperature for active room
        this.scenarioTempLoader = false
        this.getActualScenario()
        
        // getting all accesories for active room
        this.accessoryLoader = false
        this.getAllAccesories()
      }
    )
  }

  //get scenarios of temperature by room
  private getScenarioTemp(): void {
    this.scenarioTemp$ = this.scenarioTempService.fetchByRoom(this.pRoomId)
    this.scenarioTempSub$ = this.scenarioTemp$.subscribe(
      ScenarioTemp => {
        this.scenarioTemps = ScenarioTemp
        this.scenarioTempLoader = true
      }
    )

  }
  //get active scenario of temperature by room
  private getActualScenario(): void {
    this.scenarioActualTemp$ = this.scenarioTempService.fetchActual(this.pRoomId)
    this.scenarioActualTemp$.subscribe(
      actual => {
        this.actualScenario = actual
        this.tempScenarioLoader = true
      
      }
    )
  }
  //get all accesories by room
  private getAllAccesories(): void {
    this.accessorySub$ = this.accessoryService.fetchAllByRoom(this.pRoomId)
      .subscribe(
        Accesories => {
          this.accessoryLoader = true
          if (Accesories !== null) {
            this.accesories = Accesories
          }
        }
      )
  }
  // open dialog window for enter data for create new temperature scenario
  public addNewScenarioTemp(): void {
    const dialogRef = this.dialog.open(ScenarioTempComponent, {
      data: {
        roomId: this.pRoomId,
        name: ''
      },
      enterAnimationDuration: '1.5s',
      exitAnimationDuration: '1.5s',
    })

    this.dialogSub$ = dialogRef.afterClosed().subscribe(
      status => {
        if (status) {
          this.scenarioTempLoader = false
          this.getScenarioTemp()
        }
      },
      error => {
        this.toast.error(error.error.message)
        this.menuService.create(error.error.message)
      }
    )
  }
  // open dialog window for enter data for change or delete temperature scenario
  public updateScenarioTemp(scenarioTemp: ScenarionTemp): void {
    const dialogRef = this.dialog.open(ScenarioTempComponent, {
      data: scenarioTemp,
      enterAnimationDuration: '1.5s',
      exitAnimationDuration: '1.5s',
    })
    this.dialogSub$ = dialogRef.afterClosed().subscribe(
      status => {
        if (status) {
          this.scenarioTempLoader = false
          this.getScenarioTemp()
        }
      },
      error => {
        this.toast.error(error.error.message)
        this.menuService.create(error.error.message)
      }
    )
  }
  //function hand change temperature
  public onChangeTemp(): void {
    const dialogRef = this.dialog.open(TemperatureReguletedComponent, {
      data: this.actualScenario,
      enterAnimationDuration: '1.5s',
      exitAnimationDuration: '1.5s',
    })
    this.dialogSub$ = dialogRef.afterClosed().subscribe(
      status => {
        if (status) {
          this.scenarioTempLoader = false
          this.getScenarioTemp()
        }
      },
      error => {
        this.toast.error(error.error.message)
        this.menuService.create(error.error.message)
      }
    )
  }

  // function open dialog window with parameters to add new accessory
  public addNewAccessory(): void {
    const dialogRef = this.dialog.open(AccessoryManegmentComponent, {
      data: {
        accessoryId: 0,
        roomId: this.pRoomId,
        status: '',
        brightnessLevel: null,
        volume: null,
        ventilationRate: null
      },
      enterAnimationDuration: '1.5s',
      exitAnimationDuration: '1.5s',
    })
    this.dialogSub$ = dialogRef.afterClosed().subscribe(
      status => {
        if (status) {
          this.accessoryLoader = false
          this.getAllAccesories()
        }
      },
      error => {
        this.toast.error(error.error.message)
        this.menuService.create(error.error.message)
      }
    )
  }
  // function open dialog window with parameters to updade/delete accessory by id
  public onUpdateAccessory(accessory: Accessory): void {
    const dialogRef = this.dialog.open(AccessoryManegmentComponent, {
      data: accessory,
      enterAnimationDuration: '1.5s',
      exitAnimationDuration: '1.5s',
    })
    this.dialogSub$ = dialogRef.afterClosed().subscribe(
      status => {
        if (status) {
          this.accessoryLoader = false
          this.getAllAccesories()
        }
      },
      error => {
        this.toast.error(error.error.message)
        this.menuService.create(error.error.message)
      }
    )
  }

  public ngOnDestroy(): void {
    if (this.tempSub$) {
      this.tempSub$.unsubscribe()
    }
    if (this.accessorySub$) {
      this.accessorySub$.unsubscribe()
    }
    if (this.dialogSub$) {
      this.dialogSub$.unsubscribe()
    }
  }
}
