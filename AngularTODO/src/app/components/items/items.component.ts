import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/Item';
import {ItemService} from '../../services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit {

  items : Item[];

  constructor(private itemService: ItemService) { 
  }


  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  onSelect(item:Item){
     this.itemService.setFormItem(item);
  }

  onDelete(item:Item){
    if(confirm("Are you sure you want to delete the item?"))
      this.itemService.deleteItem(item);
  }

}
