import { Subscription } from 'rxjs/Subscription';
import {Component, OnInit, OnDestroy } from '@angular/core';
import { Food } from  '../food.model';
import { FoodService } from  '../food.service';
import { DataStorageService } from "../data/data-storage.service";


@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit, OnDestroy {

	foods: Food[];
	private subscription: Subscription;

  constructor(private foodService: FoodService, private ds: DataStorageService ) { }

  ngOnInit() {
  	this.foods = this.foodService.getFoods();
  	this.subscription =  this.foodService.foodChanged.subscribe(
	  		(foods: Food[]) => {
	  			this.foods = foods;
	  		}
  		)
  }



  ngOnDestroy(){
  	this.subscription.unsubscribe(); // prevent memory leaks
  }

  onEditItem(index: number) {
    console.log('clicked edited');
  	this.foodService.startEditing.next(index);

  }


  onDeleteItem(index: number) {
    this.ds.deleteFoodsDB(index) // delete from DB
    this.foodService.deleteFood(index); // delete from array
  	//console.log(index);
  }

}
