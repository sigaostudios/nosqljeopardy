import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { JeopardyBoard } from '../jeopardy-board';
import { Question } from '../question';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  board: JeopardyBoard = new JeopardyBoard();
  currentQuestion: Question;
  showNumberField: number;
  roundField: string;


  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.showNumberField = 4680;
    this.roundField = 'Jeopardy!';
    this.getBoard();
  }

  getBoard(): void {
    this.gameService.getGame(this.showNumberField, this.roundField).then(boardV => {this.board = boardV; console.log(boardV)});
  }

  setCurrentQuestion(question: Question){
    this.currentQuestion = question;
  }

  clearCurrentQuestion() {
    this.currentQuestion = undefined;
  }

  updateShow() {
    this.getBoard();
  }

}
