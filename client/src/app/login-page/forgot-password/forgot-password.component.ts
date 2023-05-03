//import from node modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

//import components
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  mode = 'check user data'
  loading = false
  changePassSub$!: Subscription
  changePasswordForm!: FormGroup
  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>
  ) { }



  public ngOnInit(): void {

    this.changePasswordForm = new FormGroup({
      email: new FormControl('Admin123@admin.com', [
        Validators.required,
        Validators.email,
      ]),
      userName: new FormControl('Admin123', [Validators.required]),
      password: new FormControl('Admin123', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      ]),
      passwordConfirm: new FormControl('Admin123', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      ]),
      homeIp: new FormControl('15.00.00.00', [
        Validators.required,
        Validators.pattern(
          /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.)){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        ),
      ]),
    });

    // preloader hide
    this.loadingTimeout(2000);
  }

  public confirmUserData(): void {

    this.changePasswordForm.disable()

    const user = {
      email: this.changePasswordForm.value.email,
      userName: this.changePasswordForm.value.userName,
      password: '',
      homeIp: this.changePasswordForm.value.homeIp,

    }
    this.loading = false
    this.changePassSub$ = this.authService.checkUser(user).subscribe(
      () => {

        this.mode = 'change password'
        this.loadingTimeout(2000)
      },
      error => {
        this.changePasswordForm.enable()
        this.toast.error(error.error.message)
      },
      () => {
        this.changePasswordForm.enable()
        this.toast.success('User data confirm')
      }
    )

  }

  public changePassword(): void {
    this.changePasswordForm.disable()
    const user = {
      email: this.changePasswordForm.value.email,
      userName: this.changePasswordForm.value.userName,
      password: this.changePasswordForm.value.password,
      homeIp: this.changePasswordForm.value.homeIp,
    }

    this.changePassSub$ = this.authService.changePassword(user).subscribe(
      () => {
        setTimeout(() => {
          this.dialogRef.close()
        }, 2000);
      },
      error => {
        this.changePasswordForm.enable()
        this.toast.error(error.error.message)
      },
      () => {
        this.toast.success('Password successfuly updated')
        this.changePasswordForm.enable()
      }
    )

  }

  public onNoClick(): void {
    this.dialogRef.close()
  }

  private loadingTimeout(time: number): void {
    setTimeout(() => {
      this.loading = true
    }, time);
  }

  ngOnDestroy(): void {
    if (this.changePassSub$) {
      this.changePassSub$.unsubscribe()
    }
  }
}
