//system modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

//componentes
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { ConfirmAccessComponent } from './register-page/confirm-access/confirm-access.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { LoaderComponent } from './shared/loaders/loader/loader.component';




@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    LoginPageComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    ConfirmAccessComponent,
    LoaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
