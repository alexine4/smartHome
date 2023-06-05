import { AccessoryService } from './../../services/accessory.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Accessory } from '../../interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Options, LabelType } from "@angular-slider/ngx-slider";
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accessory-manegment',
  templateUrl: './accessory-manegment.component.html',
  styleUrls: ['./accessory-manegment.component.scss']
})
export class AccessoryManegmentComponent implements OnInit, OnDestroy {

  conditionMode!: string
  accesoryForm!: FormGroup

  accessorySub$!: Subscription

  //variables and options for double toggle input
  Value: number = 0
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Value:</b> " + value + '%';

        default:
          return value + "%";
      }
    }
  };
  options1: Options = {
    floor: 0,
    ceil: 5,
    step: 1,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Level:</b> " + value;

        default:
          return value.toString();
      }
    }
  };
  //

  constructor(
    private accessoryService: AccessoryService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<AccessoryManegmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Accessory
  ) { }

  public ngOnInit(): void {
    this.accesoryForm = new FormGroup({
      accessoryName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      accessoryType: new FormControl('', [Validators.required, Validators.minLength(1)]),
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
    //disable form
    this.accesoryForm.disable()
    const newAccessory = {
      accessoryId: this.data.accessoryId,
      roomId: this.data.roomId,
      accessoryName: this.accesoryForm.value.accessoryName,
      accessoryType: this.accesoryForm.value.accessoryType,
      status: this.accesoryForm.value.status ==='Enable'? true:false,
      brightnessLevel: this.accesoryForm.value.brightnessLevel,
      volume: this.accesoryForm.value.volume,
      ventilationRate: this.accesoryForm.value.ventilationRate
    }
    // create subsription to create new accessory
    this.accessorySub$ = this.accessoryService.create(newAccessory).subscribe(
      answer => {
        this.toast.success(answer.message)
      },
      error => {
        this.accesoryForm.enable()
        this.toast.error(error.error.message)
      },
      () => {
        this.accesoryForm.enable()
      }
    )
  }

  public ngOnDestroy(): void {
    if (this.accessorySub$) {
      this.accessorySub$.unsubscribe()
    }
  }

}
