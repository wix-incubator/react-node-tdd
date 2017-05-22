import {expect} from 'chai';
import sinon from 'sinon';
import boardService, {chance} from './boardService';

describe('boardService', () => {
  let randomStub;

  afterEach(() => {
    if (randomStub) {
      randomStub.restore();
    }
  });

  it('should generate random mines', () => {
    const randomMines = {
      [JSON.stringify({x: 0, y: 0})]: {mine: true},
      [JSON.stringify({x: 1, y: 1})]: {mine: true},
      [JSON.stringify({x: 2, y: 2})]: {mine: true},
      [JSON.stringify({x: 3, y: 3})]: {mine: true},
      [JSON.stringify({x: 4, y: 4})]: {mine: true},
      [JSON.stringify({x: 5, y: 5})]: {mine: true},
      [JSON.stringify({x: 6, y: 6})]: {mine: true},
      [JSON.stringify({x: 7, y: 7})]: {mine: true},
      [JSON.stringify({x: 8, y: 8})]: {mine: true},
      [JSON.stringify({x: 9, y: 9})]: {mine: true}
    };

    randomStub = sinon.stub(chance, 'natural');
    let j = 0;
    for (let i = 0; i < 10; i++) {
      randomStub.onCall(j++).returns(i);
      randomStub.onCall(j++).returns(i);
    }

    expect(boardService.getRandomMines()).to.eql(randomMines);
  });
});
