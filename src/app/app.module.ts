import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { FoodManagerComponent } from './food-manager/food-manager.component';
import { FoodListComponent } from './food-manager/food-list/food-list.component';
import { FoodAddComponent } from './food-manager/food-list/food-add/food-add.component';
import { FoodService } from './food-manager/food.service';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from "./app-routing.module";
import {AuthService} from "./auth/auth.service";
import {AuthGuardService} from "./auth/auth-guard.service";

@NgModule({
  declarations: [
    AppComponent,
    FoodManagerComponent,
    FoodListComponent,
    FoodAddComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [FoodService,AuthService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
