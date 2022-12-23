import { Component } from '@angular/core';

@Component({
  selector: 'app-board-row',
  templateUrl: './board-row.component.html',
  styleUrls: ['./board-row.component.css']
})
export class BoardRowComponent {
  chooseableNums: string[] = ['0', '1', '2', '3', '4', '5', '6', '7'];
}
