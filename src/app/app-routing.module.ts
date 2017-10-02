import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from "./auth/login/login.component";
import {FoodManagerComponent} from "./food-manager/food-manager.component";

import {AuthGuardService} from "./auth/auth-guard.service";

const appRoutes: Routes = [
  { path: '', component:FoodManagerComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent },


  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
