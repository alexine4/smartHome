import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  loading = false
  showPassword = false

  authSub$!:Subscription
  forgotSub$!: Subscription
  signInForm!: FormGroup

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  public ngOnInit(): void {
    //preloader hide
    setTimeout(() => {
      this.loading = true
    }, 2500);

    // form create
    this.signInForm = new FormGroup({
      emailOrUsername: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      ])
    });

  }

  public showHidePassword(): void {
    const input = document.getElementById('password');
    if (input) {
      if (input.getAttribute('type') === 'password') {
        input.removeAttribute('type');
        input.setAttribute('type', 'text');
      } else {
        input.removeAttribute('type');
        input.setAttribute('type', 'password');
      }
    }
  }
  public forgotPassword(): void {

    this.dialog.open(ForgotPasswordComponent, {
      data: {
        confirmPass: '',
      },
      enterAnimationDuration: '1.5s',
      exitAnimationDuration: '1.5s',
    });

  }

  public submitSignIn(): void {
    this.signInForm.disable()

    this.authSub$ = this.auth.login(this.signInForm.value).subscribe(
      () => { this.router.navigate(['/database']) },
      error => {
        console.warn(error)
        this.signInForm.enable()
      }
    )
  }

  public ngOnDestroy(): void {
    if (this.forgotSub$) {
      this.forgotSub$.unsubscribe()
    }
    if (this.authSub$) {
      this.authSub$.unsubscribe()
    }
  }

}
