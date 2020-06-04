/* eslint-disable import/no-unresolved */
import Phaser from 'phaser';
import DomElements from '../dom/DomElements';
import GameStorage from '../storage/storage';
import LeaderBoard from '../objects/LeaderBoard';

export default class EnterName extends Phaser.Scene {
  constructor() {
    super('EnterName');
  }


  create() {
    this.LeaderBoard = new LeaderBoard();
    this.add.image(400, 300, 'bg');

    const body = document.getElementsByTagName('body');

    const nameDiv = DomElements.createDomElement('div', 'class', 'name-div');
    const form = DomElements.createDomElement('form');
    this.nameInput = DomElements.createDomElement('input', 'type', 'text');
    this.nameInput.setAttribute('placeholder', 'Enter your name');
    this.errorText = DomElements.createDomElement('p');
    this.errorText.style.display = 'none';
    this.submit = DomElements.createDomElement('button', 'type', 'submit');
    this.submit.textContent = 'START';


    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    this.submit.addEventListener('click', async () => {
      if (this.nameInput.value === '' || this.nameInput === null) {
        this.errorText.style = ' color: red; display: block;';
        this.errorText.textContent = 'Pleasr provide your name!';
      } else if (await this.LeaderBoard.nameExists(this.nameInput.value)) {
        this.errorText.style = ' color: red; display: block;';
        this.errorText.textContent = 'Ooops!...Name already taken!';
      } else {
        GameStorage.currentPlayer(this.nameInput.value);
        this.nameInput.value = '';
        this.scene.start('Game');
        nameDiv.style.display = 'none';
      }
    });

    form.appendChild(this.nameInput);
    form.appendChild(this.errorText);
    form.appendChild(this.submit);
    nameDiv.appendChild(form);

    nameDiv.style = `
      position: absolute;
      width: 400px;
      height: 400px;
      top: 100px;
      left: 200px;
      border-radius: 6px;
      background-color: rgba(7, 7, 7, 0.788);
    `;
    form.style = `
      margin-top: 100px;
      margin-left: 50px;
      margin-right: 50px;
      align-items: center;
      text-align: center;
    `;

    this.nameInput.style = `
      padding: 10px;
      display: block;
      width: 100%;
      text-align: center;
      font-size: 24px;
      border: 1px solid orange;
      font-weight: 800;
      letter-spacing: 0.4;
      text-transform: uppercase;
    `;

    this.submit.style = `
      display: block;
      padding: 10px;
      background-color: orange;
      color: white;
      width: 100%;
      margin-left: 10px;
      margin-top: 50px;
      font-weight: 900;
      font-size: 20px;
      border: 1px solid orange;
      text-transform: uppercase;
    `;

    body[0].appendChild(nameDiv);
  }
}