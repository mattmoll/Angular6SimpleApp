import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/Item';
import {ItemService} from '../../services/item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  
  priorities : [number, string][];
  itemOnScreen: Item;
  

  constructor(private itemService: ItemService) { 
    this.priorities = [[1,"Very High"], [2, "High"],[3, "Medium"],[4, "Low"]];
  }

  ngOnInit() {
    // Subscribe to the selectedItem observable
    this.itemService.selectedItem.subscribe(item => {
      if(item){
        this.itemOnScreen = {
          id: item.id, description: item.description, priority: item.priority, dateCreated: item.dateCreated
        };
      }
    })
  }

  onSaveClicked(){
    if(this.isEditing){
        this.itemService.updateItem(this.itemOnScreen);
    }
    else{
      this.itemOnScreen.dateCreated = new Date();
      this.itemService.addItem(this.itemOnScreen);
    }

    console.log(this.itemOnScreen);
  }

  resetItemForm(){
    this.itemOnScreen = this.itemService.getEmptyItem();
  }

  get buttonText(): string { 
    return this.isEditing ? "Save": "Add";
  }

  get isEditing(): boolean{
    return this.itemOnScreen.id !== null;
  }
  

}
