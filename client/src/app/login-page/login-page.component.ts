import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  loading = false

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    setTimeout(() => {
      this.loading = true
    }, 2500);
  }

  public ngOnDestroy(): void {
    
  }

}
