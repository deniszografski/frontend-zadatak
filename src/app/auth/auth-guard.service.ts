import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthGuardService implements CanActivate{
  constructor(private authSer: AuthService, private router: Router){}
  canActivate(rout: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authSer.isAuthenticated()){
      return true;
    }
    else{
      this.router.navigate(['/login']);
    }
  }
}
