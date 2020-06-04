import DomElements from '../dom/DomElements';
import LeaderBoard from '../objects/LeaderBoard';

export default class ScoreBoard {
  constructor(score, coins, player) {
    this._score = score;
    this._coins = coins;
    this._player = player;

    this.scoreText = document.createElement('span');
    this.LeaderBoard = new LeaderBoard();
    this.body = document.getElementsByTagName('body');
    this.scoreContainer = DomElements.createDomElement('div', 'class', 'container');
    this.scoreContainer = '';
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

  async displayLeaderBoards() {
    const leadCont = DomElements.createDomElement('div', 'class', 'board-container');
    const title = DomElements.createDomElement('h2');
    title.textContent = 'LeaderBoards';
    const list = DomElements.createDomElement('div', 'class', 'list');
    const data = await this.LeaderBoard.getScores();

    data.forEach((element) => {
      list.innerHTML += `
      <p>
        <span>${data.indexOf(element) + 1}</span>
        <span>${element[0]}</span>
        <span>${element[1]}</span>
      </p>`;
    });

    leadCont.appendChild(title);
    leadCont.appendChild(list);

    leadCont.style = `
      color: white;
    `;
    this.scoreContainer.appendChild(leadCont);
  }

  displayScoreBoard() {

    const nameDiv = DomElements.createDomElement('div', 'class', 'name-div');
  
    this.playerName = DomElements.createDomElement('h4', 'class', 'player-name');
    this.playerName.textContent = this._player;
    nameDiv.appendChild(this.playerName);

    const coinCont = DomElements.createDomElement('div', 'class', 'coin-container');
    const coinTitle = DomElements.createDomElement('span');
    coinTitle.textContent = 'Coins: ';
    this.scoreText.textContent = `${this._score} / ${this._coins}`;
    coinCont.appendChild(coinTitle);
    coinCont.appendChild(this.scoreText);

    this.scoreContainer.appendChild(nameDiv);
    this.scoreContainer.appendChild(coinCont);
    this.displayLeaderBoards();

    this.scoreContainer.style = `
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
  
    this.body[0].appendChild(this.scoreContainer);
  }

}