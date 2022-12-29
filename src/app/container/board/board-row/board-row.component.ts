import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormSubmitEvent } from './models/form-submit-event.model';
import { BoardRowService } from './services/board-row.service';

@Component({
  selector: 'app-board-row',
  templateUrl: './board-row.component.html',
  styleUrls: ['./board-row.component.css']
})
export class BoardRowComponent implements OnChanges {
  @Input() attempt: number = 0;
  @Input() currentAttempt: number = 0;
  @Input() code: string[] = [];
  @Input() gameEnded: boolean = false;

  @Output() formSubmit: EventEmitter<FormSubmitEvent> = new EventEmitter<FormSubmitEvent>();

  chooseableNums: string[] = ['0', '1', '2', '3', '4', '5', '6', '7'];
  feedback: string[] = ['-', '-', '-', '-'];

  codeForm = new FormGroup({
    num1: new FormControl('', Validators.required),
    num2: new FormControl('', Validators.required),
    num3: new FormControl('', Validators.required),
    num4: new FormControl('', Validators.required)
  });

  constructor(private boardRowService: BoardRowService) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Have to put this condition first, else form will be enabled after game has ended
    if (changes['currentAttempt'] && this.currentAttempt === this.attempt) {
      this.codeForm.enable();
    }

    if ((changes['currentAttempt'] && this.currentAttempt !== this.attempt) ||
        (changes['gameEnded'] && this.gameEnded)
       ) 
    {
      this.codeForm.disable();
    }
  }

  onSubmit() {
    this.boardRowService.formSubmit(this.codeForm, this.code, this.feedback, this.currentAttempt, this.formSubmit);
  }
}
