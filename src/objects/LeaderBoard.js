/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
const fetch = require('node-fetch');

export default class LeaderBoard {
  constructor() {
    this._gameId = 'NHD9GAF70gpUV9YSSrHD';
  }

  sorting(obj) {
    this.array = [];
    for (let i = 0; i < obj.length; i += 1) {
      this.array.push([obj[i].user, obj[i].score]);
    }
    return Array.from(this.array).sort((a, b) => b[1] - a[1]);
  }

  async getScores() {
    const res = await fetch(
      `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this._gameId}/scores`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    const response = await res.json();
    return this.sorting(response.result);
  }

  async nameExists(playerName) {
    const playersNames = await this.getScores();
    const found = playersNames.find(i => i[0] === playerName);
    return found;
  }

  async setScore(user, score) {
    const res = await fetch(
      `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this._gameId}/scores/`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, score }),
      },
    );
    return res.json();
  }
}