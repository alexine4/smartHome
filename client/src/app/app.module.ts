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
import { HeaderComponent } from './shared/layouts/site-layout/header/header.component';
import { ForgotPasswordComponent } from './login-page/forgot-password/forgot-password.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoaderComponent } from './shared/loaders/loader/loader.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { FooterComponent } from './shared/layouts/site-layout/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LivingRoomComponent } from './living-room/living-room.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { BathroomComponent } from './bathroom/bathroom.component';
import { Bedroom1Component } from './bedroom1/bedroom1.component';
import { Bedroom2Component } from './bedroom2/bedroom2.component';





@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    LoginPageComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    ConfirmAccessComponent,
    LoaderComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LivingRoomComponent,
    KitchenComponent,
    BathroomComponent,
    Bedroom1Component,
    Bedroom2Component
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
