// import from node modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import components
import { AuthGuard } from './shared/classes/auth.guard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RoomComponent } from './room/room.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { TypeMenegmentComponent } from './admin/type-menegment/type-menegment.component';
import { RoomMenegmentComponent } from './admin/room-menegment/room-menegment.component';
import { SypplyComponent } from './sypply/sypply.component';
import { SypplyManegmentComponent } from './admin/sypply-manegment/sypply-manegment.component';
import { SypplyMenuComponent } from './sypply-menu/sypply-menu.component';

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
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'room/:roomId', component: RoomComponent },
      { path: 'rooms', component: RoomMenegmentComponent,title:'Rooms manegment' },
      { path: 'sypply', component: SypplyManegmentComponent, title: 'Sypply manegment' },
      { path: 'sypplies', component: SypplyMenuComponent, title: 'Sypplies' },
      { path: 'sypply/:sypplyId', component: SypplyComponent },
      { path: 'types', component: TypeMenegmentComponent,title:'Types manegment' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
