import { Component, Inject } from '@angular/core';
import { ScenarionTemp } from '../../interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-scenario-temp',
  templateUrl: './scenario-temp.component.html',
  styleUrls: ['./scenario-temp.component.scss']
})
export class ScenarioTempComponent {
  constructor(
    public dialogRef: MatDialogRef<ScenarioTempComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ScenarionTemp
  ){  }


  public onNoClick():void{
    this.dialogRef.close(false);
  }
}
