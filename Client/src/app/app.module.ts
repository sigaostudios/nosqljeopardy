import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { SearchComponent } from './search/search.component';
import { GameService } from './services/game.service';
import { SearchService } from './services/search.service';
import { AlertModule } from 'ng2-bootstrap';
import { DatepickerModule } from 'ng2-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxDatatableModule,
    DatepickerModule.forRoot(),
    AlertModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/game',
        pathMatch: 'full'
      },
      {
        path: 'game',
        component: GameComponent
      },
      {
        path: 'search',
        component: SearchComponent
      }
    ]),
  ],
  providers: [
    GameService, 
    SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
