import { Injectable } from '@angular/core';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  items: Item[];

  constructor() {
    this.items = [
                  {id:1, description:"Test", priority:1, dateCreated: new Date(1,1,2019)},
                  {id:2, description:"Test 2", priority:3, dateCreated: new Date(3,3,2019)}
    ];
   }

   getItems():Item[]{
     return this.items;
   }
}
