import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  showPassword = true
  signUpForm!: FormGroup

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      userName: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      ]),
      passwordConfirm: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      ]),
      homeIP: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.){8,}$/)
      ])
    })

    document.querySelector('.animation-show')?.classList.add('show');
  }



  submitSignUp() {
    console.log(this.signUpForm.value);

  }

  showHidePassword() {
    const input = document.getElementById('password')
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

  ngOnDestroy(): void {

  }

}

