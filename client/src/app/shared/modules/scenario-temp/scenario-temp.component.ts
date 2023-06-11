import { ToastrService } from 'ngx-toastr';
import { ScenarioTempService } from './../../services/scenario-temp.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ScenarionTemp } from '../../interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-scenario-temp',
  templateUrl: './scenario-temp.component.html',
  styleUrls: ['./scenario-temp.component.scss']
})
export class ScenarioTempComponent implements OnInit, OnDestroy {
  conditionMode = 'update'
  scenarioForm!: FormGroup

  scenarioSub$!: Subscription

  constructor(
    private scenarioTempService: ScenarioTempService,
    private menuService:MenuService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<ScenarioTempComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ScenarionTemp
  ) { }

  public ngOnInit(): void {

    this.scenarioForm = new FormGroup({
      name: new FormControl(this.data.name, [Validators.required, Validators.minLength(3)]),
      minTemp: new FormControl(this.data.minTemp, [Validators.required, Validators.min(5), Validators.max(30)]),
      maxTemp: new FormControl(this.data.maxTemp, [Validators.required, Validators.min(5), Validators.max(30)]),
      timeStart: new FormControl(this.data.timeStart, [Validators.required]),
      timeStop: new FormControl(this.data.timeStop, [Validators.required])
    })
    if (this.data.name === '') {
      this.conditionMode = 'create'
      this.scenarioForm.setValue({
        name: '',
        minTemp: 5,
        maxTemp: 30,
        timeStart: '00:00',
        timeStop: '23:59'
      })
    }

  }

  public onSubmit(): void {
    this.scenarioForm.disable()

    const newScenario = {
      scenarioId: this.data.scenarioId === undefined || this.data.scenarioId === null ? 0 : this.data.scenarioId,
      roomId: this.data.roomId,
      name: this.scenarioForm.value.name,
      minTemp: this.scenarioForm.value.minTemp,
      maxTemp: this.scenarioForm.value.maxTemp,
      timeStart: this.scenarioForm.value.timeStart,
      timeStop: this.scenarioForm.value.timeStop
    }
    switch (this.conditionMode) {
      case 'update':        
        this.scenarioSub$ = this.scenarioTempService.update(newScenario).subscribe(
          answer => {
            this.toast.success(answer.message)
            this.dialogRef.close(true)
            this.menuService.create(answer.message)
          },
          error => {
            this.scenarioForm.enable()
            this.toast.error(error.error.message)
            this.menuService.create(error.error.message)
            
          },
          () => {
            this.scenarioForm.enable()
          }
        )
        break;
      case 'create':
        this.scenarioSub$ = this.scenarioTempService.create(newScenario).subscribe(
          answer => {
            this.toast.success(answer.message)
            this.dialogRef.close(true)
            this.menuService.create(answer.message)
          },
          error => {
            this.scenarioForm.enable()
            this.toast.error(error.error.message)
            this.menuService.create(error.error.message)
          },
          () => {
            this.scenarioForm.enable()
          }
        )
        break;
    }
    

  }

  public onDelete():void{
    this.scenarioForm.disable()
    this.scenarioSub$ = this.scenarioTempService.delete(this.data.scenarioId).subscribe(
    answer=>{
    this.toast.success(answer.message)
    this.menuService.create(answer.message)
    this.dialogRef.close(true)
    },
    error=>{
    this.scenarioForm.enable()
     this.toast.error(error.error.message)
     this.menuService.create(error.error.message)
    },
    ()=>{
    this.scenarioForm.enable()
    }
    )
  }



  public onNoClick(): void {
    this.dialogRef.close(false);
  }

  public ngOnDestroy(): void {
    if (this.scenarioSub$) {
      this.scenarioSub$.unsubscribe()
    }
  }

}
