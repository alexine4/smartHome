import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Accessory } from '../../interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Options, LabelType } from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-accessory-manegment',
  templateUrl: './accessory-manegment.component.html',
  styleUrls: ['./accessory-manegment.component.scss']
})
export class AccessoryManegmentComponent implements OnInit, OnDestroy {

  conditionMode!: string
  accesoryForm!: FormGroup


   //variables and options for double toggle input
   Value: number = 0
   options: Options = {
     floor: 0,
     ceil: 100,
     step:1,
     translate: (value: number, label: LabelType): string => {
       switch (label) {
         case LabelType.Low:
           return "<b>Value:</b> " + value+'%';
         
         default:
           return  value+"%" ;
       }
     }
   };
   options1: Options = {
    floor: 0,
    ceil: 5,
    step:1,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Level:</b> " + value;
        
        default:
          return  value.toString();
      }
    }
  };

  constructor(
    public dialogRef: MatDialogRef<AccessoryManegmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Accessory
  ) { }

  public ngOnInit(): void {
    this.accesoryForm = new FormGroup({
      accessoryName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      accessoryType: new FormControl('', [Validators.required,Validators.minLength(1)]),
      status: new FormControl('', [Validators.required]),
      brightnessLevel: new FormControl(null, [Validators.required, Validators.max(5), Validators.min(0)]),
      volume: new FormControl(null, [Validators.required, Validators.max(100), Validators.min(0)]),
      ventilationRate: new FormControl(null, [Validators.required, Validators.max(5), Validators.min(0)])
    })
    // check what mode need using and change active mode
    switch (this.data.accessoryId) {
      case 0:
        this.conditionMode = 'create'
        break;
     default:
      this.conditionMode = 'update'
      break;

    }
  }
  public OnSubmit(): void {
    this.accesoryForm.disable
    const newAccessory = {
      accessoryName:this.accesoryForm.value.accessoryName,
      accessoryType:this.accesoryForm.value.accessoryType
    }
    
  }

  public ngOnDestroy(): void {

  }

}
