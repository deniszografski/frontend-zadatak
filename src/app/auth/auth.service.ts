import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";


@Injectable()
export class AuthService {
  token: string;
  constructor(private http: Http, private router: Router) {}

  loginUser(username: string, password: string) {

    let headers = new Headers({'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W10sInVzZXJuYW1lIjoidW5pcWNhc3RlciIsImVtYWlsIjoidW5pcWNhc3RlckB1bmljYXN0LmNvbSIsImxhbmciOiJlbl9VUyIsInRlbXBsYXRlIjoiZGVmYXVsdCIsImlkX3JlZiI6IjEiLCJwcm92aWRlciI6ImxvY2FsIiwicGFzc3dvcmQiOiIkMmEkMTAkNmFxYW1XaEdQT3ZINnRPWUludTZwdUZUQkJQZGhTRDlpejdXR1BvaTlWUUthSFdJelM2NWkiLCJpZCI6MSwiY3JlYXRlZEF0IjoiMjAxNy0wMy0zMFQxNDozNTowNC44MTVaIiwidXBkYXRlZEF0IjoiMjAxNy0wMy0zMFQxNDozNTowNC44NjVaIiwiaWF0IjoxNTA2Njk4NjQ4fQ.ZahvMKrqWc-AwBX4G5EggtdiwGwrTraQPKE993yDLkc'});
    let options = new RequestOptions({headers: headers});
    let data = {"identifier": username.toString(),"password": password.toString()}
    this.http.post('http://176.31.182.158:3001/auth/local',data ,options)
      .subscribe(
        (response: Response) => {
          const data = response.json();
          this.token = data.jwt;
          this.getToken(this.token);
          this.router.navigate(['/']);
        },

        (error) => console.log(error)

      );

  }

  getToken(data: string){
    let headers = new Headers({ 'Authorization': 'Bearer '+ data });
    let options = new RequestOptions({ headers: headers });

    return options;
  }

  isAuthenticated(){
    return this.token != null;
  }

}
