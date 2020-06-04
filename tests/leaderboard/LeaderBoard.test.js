/* eslint-disable no-undef */
import LeaderBoard from '../../src/objects/LeaderBoard';

describe('LeaderBoard connection test', () => {
  let leaderboard;
  beforeEach(() => { leaderboard = new LeaderBoard(); });

  test('Submit player valid scores', () => leaderboard.setScore('Denis Oluka', 400).then( res => {
      expect(res.result).toBe('Leaderboard score created correctly.');
    }));

  test('Fetch all player scores', () => leaderboard.getScores().then( response => {
      expect(typeof response).toBe('object');
  }));
}); 