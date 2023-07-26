// imports from node moduele
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
//imports components and service
import { AuthService } from '../shared/services/auth.service';
import { ConfirmAccessComponent } from './confirm-access/confirm-access.component';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  showPassword = true;
  signUpForm!: FormGroup;
  regSub$!: Subscription
  checkIPSub$!: Subscription
  dialogSub$!: Subscription
  message!: string
  loading = false
  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private toast: ToastrService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.signUpForm = new FormGroup({
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

    // ending start animation 
    document.querySelector('.animation-show')?.classList.add('show');
    setTimeout(() => {
      this.loading = true
    }, 2500);

  }

  public submitSignUp():void {
    this.signUpForm.disable()
    // create new object user
    const newUser = {
      userName: this.signUpForm.value.userName,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      homeIp: this.signUpForm.value.homeIp
    }
    // check ip is exist or not
    this.checkIPSub$ = this.authService.confirmConnectionReq(newUser).subscribe(
      ()=>{
        // if ip exist open module window
        // in this window user must been confirmed special code
        const dialogRef = this.dialog.open(ConfirmAccessComponent, {
          data: {
            confirmPass: '',
          },
          enterAnimationDuration: '1.5s',
          exitAnimationDuration: '1.5s',
        });
        this.dialogSub$ = dialogRef.afterClosed().subscribe(
          result => {
            this.signUpForm.enable()
            // check user successufully confirmed code
            if (result !== undefined) {
              // register new user
              this.regSub$ = this.authService.register(newUser).subscribe(
                () => {
                  setTimeout(() => {
                    this.router.navigate(['/login'], {
                      queryParams: {
                        registered: true
                      }
                    })
                  }, 5000);
                },
                error => {
                  this.signUpForm.enable()
                  this.toast.error(error.error.message)
                },
                () => {
                  this.toast.success('New user successfully registration')
                }
              )
            }
          }
        )
      },
      error=>{
        this.signUpForm.enable()
        this.toast.error(error.error.message)
      },
      () => {
        this.toast.success('Device with this IP exist')
      }
    )
  
      
    

   
  }

  public  showHidePassword():void {
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

  public ngOnDestroy(): void {
    if (this.regSub$) {
      this.regSub$.unsubscribe()
    }
    if (this.dialogSub$) {
      this.dialogSub$.unsubscribe()
    }
    if (this.checkIPSub$) {
      this.checkIPSub$.unsubscribe()
    }
    
  }
}

