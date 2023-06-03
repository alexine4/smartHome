import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScenarionTemp } from '../../interfaces';

@Component({
  selector: 'app-accessory-manegment',
  templateUrl: './accessory-manegment.component.html',
  styleUrls: ['./accessory-manegment.component.scss']
})
export class AccessoryManegmentComponent {

  constructor(
    public dialogRef: MatDialogRef<AccessoryManegmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ScenarionTemp
  ) { }

}
