import { Food } from './food.model';
import { Subject } from 'rxjs/Subject';


export class FoodService{
	foodChanged = new Subject<Food[]>(); // help us to know that somethings happened with foods
	startEditing = new Subject<number>();
	private foods: Food[] = [
		new Food(1,'Apple','10'),
		new Food(2,'Orange','15')
	];


	setFoods(foods: Food[]) {
		this.foods = foods;
		this.foodChanged.next(this.foods.slice());
		console.log(this.foods);
	}

	getFoods(){
		return this.foods;
	}

	getFood(index: number) {
		return this.foods[index];
	}

	addFoods(food: Food){
		this.foods.push(food);
		this.foodChanged.next(this.foods.slice());
	}

	updateFood(index: number, newFood: Food) {
		this.foods[index] = newFood;
		//console.log(this.foods[index]);
		this.foodChanged.next(this.foods.slice());
	}

	deleteFood(index: number) {
		this.foods.splice(index,1);
		this.foodChanged.next(this.foods.slice());
	}



}
