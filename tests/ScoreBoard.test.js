import ScoreBoard from '../src/objects/ScoreBoard';

describe('Display the scoreboard', () => {
  let scoreboard;
  beforeEach(() => { scoreboard = new ScoreBoard(200, 500, 'Denis'); });

  test('It should the current score', () => {
    expect(scoreboard.score).toEqual(200);
  });

  test('It should the current coin count', () => {
    expect(scoreboard.coins).toEqual(500);
  });

  test('It should update the player score', () => {
    scoreboard.score = 205;
    expect(scoreboard.score).toEqual(205);
  });

  test('It should update the player score', () => {
    scoreboard.coins = 750;
    expect(scoreboard.coins).toEqual(750);
  });
});