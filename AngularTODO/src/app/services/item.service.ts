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
    this.items = [];
   }

   getItems() : Observable<Item[]> {
    if(localStorage.getItem('items') === null)
      this.items = [];
    else
      this.items = JSON.parse(localStorage.getItem('items'));
    
    this.items = this.items.sort((itemA, itemB) => itemA.priority - itemB.priority);  

    return of(this.items);
   }

   addItem(itemToAdd:Item){
     console.log(this.getMaxId());
      itemToAdd.id = this.items.length > 0 ? this.getMaxId() + 1 : 1;
      this.items.unshift(itemToAdd);
  
      this.sortItemsByPriority();
      this.updateLocalStorage();
   }

   updateItem(itemToUpdate:Item){
    this.items.forEach((currentItem, index)=>{
      if(currentItem.id == itemToUpdate.id){
        this.items.splice(index, 1);
      }
    })
    this.items.unshift(itemToUpdate);

    this.sortItemsByPriority();
    this.updateLocalStorage();
   }

   deleteItem(itemToDelete:Item){
    this.items.forEach((currentItem, index)=>{
      if(currentItem.id == itemToDelete.id){
        this.items.splice(index, 1);
      }
    })

    this.sortItemsByPriority();
    this.updateLocalStorage();
   }

   setFormItem(item:Item){
    this.itemSource.next(item);
   }

   resetSelectedItem(){
     this.resetSelectedSource.next(true);
   }

   // Helpers

   getMaxId(){
     return this.items.reduce((maxPrevItem, nextItem)=>  this.getItemFromId(Math.max(maxPrevItem.id, nextItem.id))).id;
   }

   getItemFromId(id : number): Item {
    return this.items.find((item) => item.id ===id);
   }

   updateLocalStorage(){
    localStorage.setItem('items', JSON.stringify(this.items));
   }

   sortItemsByPriority(){
    this.items = this.items.sort((itemA, itemB) => itemA.priority - itemB.priority); 
   }

  getEmptyItem(): Item{
    return {id:null, description:null, priority:null,dateCreated:null};
  }

}
