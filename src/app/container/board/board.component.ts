import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() code: string[] = [];

  @Output() resetClick: EventEmitter<void> = new EventEmitter<void>();

  remainingAttempts: number = 10;

  array = Array;

  reset() {
    this.remainingAttempts = 10;
    this.resetClick.emit();
  }
}
