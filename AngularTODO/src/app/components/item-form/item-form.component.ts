import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  
  priorities : [number, string][];

  constructor() { 
    this.priorities = [[1,"Very High"], [2, "High"],[3, "Medium"],[4, "Low"]];
  }

  ngOnInit() {
  }

}
