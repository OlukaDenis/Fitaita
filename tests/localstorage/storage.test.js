import GameStorage from '../../src/storage/storage';

describe('Local storage ', () => {

  test('It should save current player', () => {
    expect(typeof GameStorage.currentPlayer('Denis')).toBe('string');
  });

  test('It should get the current player name', () => {
    expect(GameStorage.getCurrentPlayer()).toEqual('Denis');
  });

  test('Should save the current player score', () => {
    expect(typeof GameStorage.currentScore(300)).toBe('string');
  });

  test('It should get the current player scores', () => {
    expect(GameStorage.getCurrentScore()).toEqual(300);
  });
});