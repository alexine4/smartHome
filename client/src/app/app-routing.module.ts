// import from node modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import components
import { AuthGuard } from './shared/classes/auth.guard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { BathroomComponent } from './bathroom/bathroom.component';
import { Bedroom1Component } from './bedroom1/bedroom1.component';
import { Bedroom2Component } from './bedroom2/bedroom2.component';
import { HomeComponent } from './home/home.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { LivingRoomComponent } from './living-room/living-room.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { WaterComponent } from './suplays/water/water.component';
import { GasComponent } from './suplays/gas/gas.component';
import { HeatComponent } from './suplays/heat/heat.component';
import { ElectricityComponent } from './suplays/electricity/electricity.component';

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
      { path: 'bathroom', component: BathroomComponent, title: 'Bathroom' },
      { path: 'bedroom1', component: Bedroom1Component, title: 'Bedrooom 1' },
      { path: 'bedroom2', component: Bedroom2Component, title: 'Bedrooom 2' },
      { path: 'electrisity', component: ElectricityComponent, title: 'Electrisity supply' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'heat', component: HeatComponent, title: 'Heat supply' },
      { path: 'gas', component: GasComponent, title: 'Gas supply' },
      { path: 'kitchen', component: KitchenComponent, title: 'Kitchen' },
      { path: 'living-room', component: LivingRoomComponent, title: 'Living room' },
      { path: 'water', component: WaterComponent, title: 'Water supply' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
