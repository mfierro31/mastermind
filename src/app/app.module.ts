import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { BoardComponent } from './container/board/board.component';
import { HeaderComponent } from './container/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    BoardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
