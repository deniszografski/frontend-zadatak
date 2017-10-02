import { Component, OnInit } from '@angular/core';
import { FoodService }  from './food.service';
import { DataStorageService }  from './data/data-storage.service';

@Component({
  selector: 'app-food-manager',
  templateUrl: './food-manager.component.html',
  styleUrls: ['./food-manager.component.css'],
  providers: [FoodService, DataStorageService]
})
export class FoodManagerComponent implements OnInit {
  constructor(private fs: FoodService ,private dataS: DataStorageService) {}

  ngOnInit() {
  	this.dataS.getFoodsDB(); // load values from DB
  }
  
}
