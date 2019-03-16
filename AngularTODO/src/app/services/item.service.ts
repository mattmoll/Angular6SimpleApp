import { Injectable } from '@angular/core';
import { Item } from '../models/Item';

import { BehaviorSubject, Observable, of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  items: Item[];

  private itemSource = new BehaviorSubject<Item>(this.getEmptyItem());
  selectedItem =  this.itemSource.asObservable();

  private resetSelectedSource = new BehaviorSubject<boolean>(true);
  resetSelected =  this.resetSelectedSource.asObservable();

  constructor() {
    this.items = [
      // {id:2, description:"Test", priority:1, dateCreated: new Date(1,1,2019)},
      // {id:1, description:"Test 2", priority:3, dateCreated: new Date(3,3,2019)}
    ];
   }

   getItems() : Observable<Item[]> {
     return of(this.items);
   }

   addItem(itemToAdd:Item){
      itemToAdd.id = this.items.length > 0 ? this.items[0].id + 1 : 1;
      this.items.unshift(itemToAdd);
   }

   updateItem(itemToUpdate:Item){
      this.items.forEach((currentItem, index)=>{
        if(currentItem.id == itemToUpdate.id){
          this.items.splice(index, 1);
        }
      })
      this.items.unshift(itemToUpdate);
   }

   deleteItem(itemToDelete:Item){
    this.items.forEach((currentItem, index)=>{
      if(currentItem.id == itemToDelete.id){
        this.items.splice(index, 1);
      }
    })
   }

   setFormItem(item:Item){
    this.itemSource.next(item);
   }

   resetSelectedItem(){
     this.resetSelectedSource.next(true);
   }

  getEmptyItem(): Item{
    return {id:null, description:null, priority:null,dateCreated:null};
  }

}
