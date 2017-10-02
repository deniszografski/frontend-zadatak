import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild, Input} from '@angular/core';
import { Food } from '../../food.model';
import { FoodService } from  '../../food.service';
import { DataStorageService } from "../../data/data-storage.service";


@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.component.html',
  styleUrls: ['./food-add.component.css']
})

export class FoodAddComponent implements OnInit, OnDestroy {
	@ViewChild('formEl') fForm: NgForm;

	subscription: Subscription;
	editMode = false; // form button changed from Add to Save
	editedItemIndex: number;
	editedItem: Food;
  constructor(private foodService: FoodService,private ds: DataStorageService) { }

  ngOnInit() {
  	this.subscription = this.foodService.startEditing.subscribe(
  			(index: number) => {
  				this.editedItemIndex = index;
  				this.editMode = true;
  				this.editedItem = this.foodService.getFood(index);
  				this.fForm.setValue({
            id: this.editedItem.id,
  					name: this.editedItem.name,
  					price: this.editedItem.price
  				})
  			}
  		);

  }

  onAddItem(form: NgForm) {
  	const value = form.value;
  	const newFood = new Food(value.id,value.name,value.price);
  	if(this.editMode) {
      const newFood = new Food(value.id,value.name,value.price);
  		this.foodService.updateFood(this.editedItemIndex,newFood); //edit local
      this.ds.updateFoodsDB(newFood); // edit DB

  	}
  	else {
      this.ds.addFoodsDB(newFood); // add food DB
      this.foodService.getFoods();
  	}
  	form.reset();
  	this.editMode = false;
  }


  ngOnDestroy() {
  	this.subscription.unsubscribe();
  }


}
