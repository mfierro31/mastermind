import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { BoardComponent } from './container/board/board.component';
import { HeaderComponent } from './container/header/header.component';
import { BoardRowComponent } from './container/board/board-row/board-row.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    BoardComponent,
    HeaderComponent,
    BoardRowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
