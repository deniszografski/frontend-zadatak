import { Food } from '../food.model';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FoodService } from '../food.service';
import "rxjs/Rx";


@Injectable()
export class DataStorageService{
	constructor(private http: Http, private foodService: FoodService) {}
  foods: Food[];

	getFoodsDB() {

		let headers = new Headers({ 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W10sInVzZXJuYW1lIjoidW5pcWNhc3RlciIsImVtYWlsIjoidW5pcWNhc3RlckB1bmljYXN0LmNvbSIsImxhbmciOiJlbl9VUyIsInRlbXBsYXRlIjoiZGVmYXVsdCIsImlkX3JlZiI6IjEiLCJwcm92aWRlciI6ImxvY2FsIiwicGFzc3dvcmQiOiIkMmEkMTAkNmFxYW1XaEdQT3ZINnRPWUludTZwdUZUQkJQZGhTRDlpejdXR1BvaTlWUUthSFdJelM2NWkiLCJpZCI6MSwiY3JlYXRlZEF0IjoiMjAxNy0wMy0zMFQxNDozNTowNC44MTVaIiwidXBkYXRlZEF0IjoiMjAxNy0wMy0zMFQxNDozNTowNC44NjVaIiwiaWF0IjoxNTA2Njk4NjQ4fQ.ZahvMKrqWc-AwBX4G5EggtdiwGwrTraQPKE993yDLkc'});
		let options = new RequestOptions({ headers: headers });
		this.http.get('http://176.31.182.158:3001/food',options)
      .map(
        result => result.json().map(
          obj => new Food(obj.id,obj.name,obj.price)
        )
      )
      .subscribe(
        (foods: any[]) => (this.foodService.setFoods(foods)),

      (error) => console.log(error)
      )

	}

	updateFoodsDB(foods: Food){
	  //console.log(foods);
    let headers = new Headers({ 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W10sInVzZXJuYW1lIjoidW5pcWNhc3RlciIsImVtYWlsIjoidW5pcWNhc3RlckB1bmljYXN0LmNvbSIsImxhbmciOiJlbl9VUyIsInRlbXBsYXRlIjoiZGVmYXVsdCIsImlkX3JlZiI6IjEiLCJwcm92aWRlciI6ImxvY2FsIiwicGFzc3dvcmQiOiIkMmEkMTAkNmFxYW1XaEdQT3ZINnRPWUludTZwdUZUQkJQZGhTRDlpejdXR1BvaTlWUUthSFdJelM2NWkiLCJpZCI6MSwiY3JlYXRlZEF0IjoiMjAxNy0wMy0zMFQxNDozNTowNC44MTVaIiwidXBkYXRlZEF0IjoiMjAxNy0wMy0zMFQxNDozNTowNC44NjVaIiwiaWF0IjoxNTA2Njk4NjQ4fQ.ZahvMKrqWc-AwBX4G5EggtdiwGwrTraQPKE993yDLkc'});
    let options = new RequestOptions({ headers: headers });

    var id = foods.id;
    var data = {"name": foods.name,"price": foods.price.toString()};
    //console.log(id);
    //console.log(data);
    this.http.put('http://176.31.182.158:3001/food/'+id,data,options).subscribe(
      (response) => console.log(response)

    );

  }

  addFoodsDB(foods: Food){
    let headers = new Headers({ 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W10sInVzZXJuYW1lIjoidW5pcWNhc3RlciIsImVtYWlsIjoidW5pcWNhc3RlckB1bmljYXN0LmNvbSIsImxhbmciOiJlbl9VUyIsInRlbXBsYXRlIjoiZGVmYXVsdCIsImlkX3JlZiI6IjEiLCJwcm92aWRlciI6ImxvY2FsIiwicGFzc3dvcmQiOiIkMmEkMTAkNmFxYW1XaEdQT3ZINnRPWUludTZwdUZUQkJQZGhTRDlpejdXR1BvaTlWUUthSFdJelM2NWkiLCJpZCI6MSwiY3JlYXRlZEF0IjoiMjAxNy0wMy0zMFQxNDozNTowNC44MTVaIiwidXBkYXRlZEF0IjoiMjAxNy0wMy0zMFQxNDozNTowNC44NjVaIiwiaWF0IjoxNTA2Njk4NjQ4fQ.ZahvMKrqWc-AwBX4G5EggtdiwGwrTraQPKE993yDLkc'});
    let options = new RequestOptions({ headers: headers });

    var data = {"name": foods.name,"price": foods.price.toString()};

    this.http.post('http://176.31.182.158:3001/food/',data,options)

      .subscribe(
        (response: Response) => {
          const data = response.json();
          let food = new Food(data.id, data.name, data.price);
          this.foodService.addFoods(food);
        },
        (error) => console.log(error)

    );

  }

  deleteFoodsDB(index: number){
    let headers = new Headers({ 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W10sInVzZXJuYW1lIjoidW5pcWNhc3RlciIsImVtYWlsIjoidW5pcWNhc3RlckB1bmljYXN0LmNvbSIsImxhbmciOiJlbl9VUyIsInRlbXBsYXRlIjoiZGVmYXVsdCIsImlkX3JlZiI6IjEiLCJwcm92aWRlciI6ImxvY2FsIiwicGFzc3dvcmQiOiIkMmEkMTAkNmFxYW1XaEdQT3ZINnRPWUludTZwdUZUQkJQZGhTRDlpejdXR1BvaTlWUUthSFdJelM2NWkiLCJpZCI6MSwiY3JlYXRlZEF0IjoiMjAxNy0wMy0zMFQxNDozNTowNC44MTVaIiwidXBkYXRlZEF0IjoiMjAxNy0wMy0zMFQxNDozNTowNC44NjVaIiwiaWF0IjoxNTA2Njk4NjQ4fQ.ZahvMKrqWc-AwBX4G5EggtdiwGwrTraQPKE993yDLkc'});
    let options = new RequestOptions({ headers: headers });

    let foods = this.foodService.getFoods();
    let valueAtIndex = foods[index];

    let id = valueAtIndex.id;

    this.http.delete('http://176.31.182.158:3001/food/'+id,options).subscribe(
      (response) => console.log(response)
    );

  }

}
