import Chance from 'chance';
const chance = new Chance();

const boardService = {
  getRandomMines: () => {
    const board = {};
    const mineRange = {min: 0, max: 9};
    while (Object.keys(board).length < 10) {
      const x = chance.natural(mineRange);
      const y = chance.natural(mineRange);
      if (!board[JSON.stringify({x, y})]) {
        board[JSON.stringify({x, y})] = {mine: true};
      }
    }
    return board;
  }
};

export default boardService;
export {chance};
