import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {
  url: string = 'https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new';

  constructor() { }

  async getRandomCode(): Promise<string[]> {
    const resp = await fetch(this.url);
    const text = await resp.text();
    const rawStringArr = text.split('');
    return [rawStringArr[0], rawStringArr[2], rawStringArr[4], rawStringArr[6]];
  }
}
