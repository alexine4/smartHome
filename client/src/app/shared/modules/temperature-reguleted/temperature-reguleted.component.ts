import { ScenarioTempService } from './../../services/scenario-temp.service';
import { Component, Inject, OnDestroy } from '@angular/core';
import { Options, LabelType } from "@angular-slider/ngx-slider";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScenarionTemp } from '../../interfaces';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-temperature-reguleted',
  templateUrl: './temperature-reguleted.component.html',
  styleUrls: ['./temperature-reguleted.component.scss']
})
export class TemperatureReguletedComponent implements OnDestroy {

  changeTempSub$!: Subscription
constructor(
  private scenarioTempService: ScenarioTempService,
  private toast: ToastrService,
  public dialogRef: MatDialogRef<TemperatureReguletedComponent>,
  @Inject(MAT_DIALOG_DATA) public data: ScenarionTemp
  ){}

  //variables and options for double toggle input
  minValue: number = this.data.minTemp;
  maxValue: number = this.data.maxTemp;
  options: Options = {
    floor: 5,
    ceil: 30,
    step:0.1,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min Temp:</b> " + value+"º";
        case LabelType.High:
          return "<b>Max Temp:</b> " + value+"º";
        default:
          return  value+"º" ;
      }
    }
  };
  

  onChangeTemp():void{
    //record new valus into data
    this.data.minTemp = this.minValue
    this.data.maxTemp = this.maxValue
    // update scenarion temperature
    this.changeTempSub$ = this.scenarioTempService.update(this.data).subscribe(
    answer=>{
    this.toast.success(answer.message)
    this.dialogRef.close(true)
    },
    error=>{
     this.toast.error(error.error.message)
    }
    )
  }

  ngOnDestroy(): void {
    
  }
    
}
