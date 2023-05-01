import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-confirm-access',
  templateUrl: './confirm-access.component.html',
  styleUrls: ['./confirm-access.component.scss']
})
export class ConfirmAccessComponent {


  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<ConfirmAccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: confirmCod
  ) {

  }
  confirmCode(): void {
       this.authService.confirmConnectionRes(this.data).subscribe(
      () => {
        this.dialogRef.close(true);
      },
      error => {
        this.toast.error(error.error.message)
      },
      () => {
        this.toast.success('Confirm success')
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface confirmCod {
  confirmPass: string
}