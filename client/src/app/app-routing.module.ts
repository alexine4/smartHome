// import from node modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import components
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { AuthGuard } from './shared/classes/auth.guard';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent }
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard],
    children:[
      { path: 'home', component: SiteLayoutComponent, title: 'Home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
