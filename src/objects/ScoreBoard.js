import GameStorage from '../storage/storage';
import DomElements from '../dom/DomElements';

export default class ScoreBoard {

  constructor(score, coins) {
    this._score = score;
    this._coins = coins;

    this._currentPlayer = GameStorage.getCurrentPlayer();
    this.scoreText = document.createElement('span');
  }

  set score(score) {
    this._score = score;
    this.scoreText.textContent = `${this._score} / ${this._coins}`;
  }

  set coins(coins) {
    this._coins = coins;
    this.scoreText.textContent = `${this._score} / ${this._coins}`;
  }

  get score() {
    return Number(this._score);
  }

  get coins() {
    return Number(this._coins);
  }

  displayScoreBoard() {
    const body = document.getElementsByTagName('body');
    const scoreContainer = DomElements.createDomElement('div', 'class', 'container');

    const nameDiv = DomElements.createDomElement('div', 'class', 'name-div');

    this.playerName = DomElements.createDomElement('h4', 'class', 'player-name');
    this.playerName.textContent = this._currentPlayer;
    nameDiv.appendChild(this.playerName);

    const coinCont = DomElements.createDomElement('div', 'class', 'coin-container');
    const coinTitle = DomElements.createDomElement('span');
    coinTitle.textContent = 'Coins: ';  
    this.scoreText.textContent = `${this._score} / ${this._coins}`;  
    coinCont.appendChild(coinTitle);
    coinCont.appendChild(this.scoreText);

    scoreContainer.appendChild(nameDiv);
    scoreContainer.appendChild(coinCont);


    scoreContainer.style = `
      position: absolute;
      width: 230px;
      height: 500px;
      top: 20px;
      left: 810px;
      background-color: rgba(7, 7, 7, 0.9);
    `;

    this.playerName.style = `
      color: aqua;
      padding: 8px;
      font-weight: 900;
      text-transform: uppercase;
      font-size: 24px;
      text-align: center;
      display: block;
    `;

    coinCont.style = `
      color: white;
      text-align: center;
      padding; 10px;
    `;

    this.scoreText.style = `
      padding-left: 10px;
      font-size: 24px;
    `;

    coinTitle.style = `
      text-transform: uppercase;
      font-size: 20px;

    `;

    body[0].appendChild(scoreContainer);
  }

}