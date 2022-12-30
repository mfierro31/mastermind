import { Component, OnInit } from '@angular/core';
import { ContainerService } from './services/container.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  fourDigitCode: string[] = [];
  loading: boolean = true;

  constructor (private containerService: ContainerService) {}

  async ngOnInit() {
    this.fourDigitCode = await this.containerService.getRandomCode();
    this.loading = false;
  }
}
