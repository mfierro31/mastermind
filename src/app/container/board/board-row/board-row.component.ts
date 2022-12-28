import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormSubmitEvent } from './models/form-submit-event.model';

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
  formSubmitted = false;

  codeForm = new FormGroup({
    num1: new FormControl('', Validators.required),
    num2: new FormControl('', Validators.required),
    num3: new FormControl('', Validators.required),
    num4: new FormControl('', Validators.required)
  });

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['currentAttempt'] && this.currentAttempt !== this.attempt) ||
        (changes['gameEnded'] && this.gameEnded)
       ) 
    {
      this.codeForm.disable();
    }

    if (changes['currentAttempt'] && this.currentAttempt === this.attempt) {
      this.codeForm.enable();
    }
  }

  private calculateFeedbackCode(iCode: string, code: string[], iGuess: string): string {
    if (iCode === iGuess) {
      return 'CNP';
    } else if (code.includes(iGuess)) {
      return 'CN';
    } else {
      return 'I';
    }
  }

  private calculateFeedback(code: string[], feedback: string[], formValues: string[]) {
    const indices = [0, 1, 2, 3];
    indices.forEach(i => {
      feedback[i] = this.calculateFeedbackCode(code[i], code, formValues[i])
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    const form: Partial<any> = this.codeForm.value;
    const formValues = [form['num1'], form['num2'], form['num3'], form['num4']];
    this.calculateFeedback(this.code, this.feedback, formValues);
    this.feedback.sort((a, b): number => {
      const sortOrder = ['CNP', 'CN', 'I'];
      const aIndex = sortOrder.indexOf(a);
      const bIndex = sortOrder.indexOf(b);
      return aIndex - bIndex;
    })
    const hasWon = this.feedback.every(fb => fb === 'CNP');
    if (hasWon) {
      window.alert('YOU WON!');
      this.formSubmit.emit({ won: true, lost: false });
    } else if (!hasWon && this.currentAttempt === 10) {
      window.alert('YOU LOST.  SORRY :(');
      this.formSubmit.emit({ won: false, lost: true });
    } else {
      this.formSubmit.emit({ won: false, lost: false });
    }
    this.codeForm.disable();
  }
}
