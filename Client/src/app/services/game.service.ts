import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { JeopardyBoard } from '../jeopardy-board';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GameService {
  private gamesUrl = 'http://localhost:2475/api/questions/'

  constructor(private http: Http) { }

  getGame(showNumber: number, round: string): Promise<JeopardyBoard> {
    var url = this.gamesUrl + '?showNumber=' + String(showNumber) + '&round=' + encodeURI(round);
    return this.http.get(url)
                .toPromise()
                .then(response => response.json() as JeopardyBoard)
                .catch(this.handleError);

    //return Promise.resolve(MOCK_BOARD);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
