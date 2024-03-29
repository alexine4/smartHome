//system modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ToastrModule } from 'ngx-toastr';

//componentes
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { ConfirmAccessComponent } from './register-page/confirm-access/confirm-access.component';
import { HeaderComponent } from './shared/layouts/site-layout/header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './shared/layouts/site-layout/footer/footer.component';
import { ForgotPasswordComponent } from './login-page/forgot-password/forgot-password.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoaderComponent } from './shared/loaders/loader/loader.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RoomComponent } from './room/room.component';
import { RoomMenegmentComponent } from './admin/room-menegment/room-menegment.component';
import { ScenarioTempComponent } from './shared/modules/scenario-temp/scenario-temp.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { SubLoaderComponent } from './shared/loaders/sub-loader/sub-loader.component';
import { TypeMenegmentComponent } from './admin/type-menegment/type-menegment.component';
//guard components
import { AuthGuard } from './shared/classes/auth.guard';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { TemperatureReguletedComponent } from './shared/modules/temperature-reguleted/temperature-reguleted.component';
import { AccessoryManegmentComponent } from './shared/modules/accessory-manegment/accessory-manegment.component';
import { SypplyComponent } from './sypply/sypply.component';
import { SypplyManegmentComponent } from './admin/sypply-manegment/sypply-manegment.component';
import { SypplyMenuComponent } from './sypply-menu/sypply-menu.component';
import { DataGetSupportComponent } from './shared/modules/data-get-support/data-get-support.component';
import { CheckListComponent } from './shared/modules/check-list/check-list.component';
import { CheckLogsComponent } from './shared/modules/check-logs/check-logs.component';






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
    RoomComponent,
    HomeComponent,
    TypeMenegmentComponent,
    RoomMenegmentComponent,
    SubLoaderComponent,
    ScenarioTempComponent,
    TemperatureReguletedComponent,
    AccessoryManegmentComponent,
    SypplyComponent,
    SypplyManegmentComponent,
    SypplyMenuComponent,
    DataGetSupportComponent,
    CheckListComponent,
    CheckLogsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    NgxSliderModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
