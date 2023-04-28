import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-access',
  templateUrl: './confirm-access.component.html',
  styleUrls: ['./confirm-access.component.scss']
})
export class ConfirmAccessComponent {


  constructor(
    public dialogRef: MatDialogRef<ConfirmAccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfCod
  ) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface ConfCod {
  confirmCod: string
}