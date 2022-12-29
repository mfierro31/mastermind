import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormSubmitEvent } from '../models/form-submit-event.model';

@Injectable({
  providedIn: 'root'
})
export class BoardRowService {

  constructor() { }

  private sortFeedback(feedback: string[]) {
    // To make it more like the real board game, here we sort the feedback, so it's always in the following order
    // (and so user's don't know which feedback corresponds to which guess): 1st - Correct number and correct position,
    // 2nd - Correct number, but wrong position, 3rd - Incorrect number
    // Example:  ['CN', 'CNP', 'I', 'CNP'] gets sorted to -> ['CNP', 'CNP', 'CN', 'I']
    feedback.sort((a, b): number => {
      const sortOrder = ['CNP', 'CN', 'I'];
      const aIndex = sortOrder.indexOf(a);
      const bIndex = sortOrder.indexOf(b);
      return aIndex - bIndex;
    });
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

  private calculateAndSortFeedback(code: string[], feedback: string[], formValues: string[]) {
    const indices = [0, 1, 2, 3];
    indices.forEach(i => {
      feedback[i] = this.calculateFeedbackCode(code[i], code, formValues[i])
    });
    this.sortFeedback(feedback);
  }

  private handleWonLostOrNeither(feedback: string[], code: string[], currentAttempt: number, formSubmit: EventEmitter<FormSubmitEvent>) {
    const hasWon = feedback.every(fb => fb === 'CNP');
    if (hasWon) {
      window.alert('YOU WON!');
      formSubmit.emit({ won: true, lost: false });
    } else if (!hasWon && currentAttempt === 10) {
      window.alert(`YOU LOST.  SORRY :(\nCODE WAS: ${code[0]} ${code[1]} ${code[2]} ${code[3]}`);
      formSubmit.emit({ won: false, lost: true });
    } else {
      formSubmit.emit({ won: false, lost: false });
    }
  }

  formSubmit(codeForm: FormGroup, code: string[], feedback: string[], currentAttempt: number, formSubmit: EventEmitter<FormSubmitEvent>) {
    const form = codeForm.value;
    const formValues = [form['num1'], form['num2'], form['num3'], form['num4']];
    this.calculateAndSortFeedback(code, feedback, formValues);
    this.handleWonLostOrNeither(feedback, code, currentAttempt, formSubmit);
    codeForm.disable();
  }
}
