import { Component, Input } from '@angular/core';
import { FormSubmitEvent } from './board-row/models/form-submit-event.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() code: string[] = [];

  remainingAttempts: number = 10;
  attempts: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  currentAttempt: number = 1;
  gameEnded: boolean = false;

  reset() {
    window.location.reload();
  }

  rowSubmit(formSubmitEvent: FormSubmitEvent) {
    if (formSubmitEvent.won || formSubmitEvent.lost) {
      this.gameEnded = true;
    }
    this.remainingAttempts -= 1;
    this.currentAttempt += 1;
  }
}
