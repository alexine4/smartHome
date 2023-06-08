import { Component, Inject } from '@angular/core';
import { Sypply } from '../../interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-data-get-support',
  templateUrl: './data-get-support.component.html',
  styleUrls: ['./data-get-support.component.scss']
})
export class DataGetSupportComponent {
  touched: boolean = false
  mode:string=''
  constructor(
    public dialogRef: MatDialogRef<DataGetSupportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sypply
  ){
    if (data.tarif!==null) {
      this.mode='tarif'
    }
    if (data.sypplyAccount!==null) {
      this.mode='account'
    }
  }
}
