import React from 'react';
import {expect} from 'chai';
import nock from 'nock';
import {mount} from 'enzyme';
import Game from './Game';
import {getTestBaseUrl, eventually} from '../../../test/test-common';

const driver = {
  saveGame: ({wrapper, gameName}) => {
    wrapper.find('[data-hook="game-name-input"]').simulate('change', {target: {value: gameName}});
    wrapper.find('[data-hook="game-save"]').simulate('click');
  },
  clickCellAt: ({wrapper, index}) => wrapper.find('[data-hook="cell"]').at(index).simulate('click')
};
describe('Game', () => {
  let wrapper;

  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error(`pending mocks: ${nock.pendingMocks()}`);
    }
  });

  afterEach(() => {
    nock.cleanAll();
  });

  afterEach(() => wrapper.detach());

  it('should save a game', () => {
    let savedData;
    const gameExpectedData = {name: 'Yaniv', board: {[JSON.stringify({x: 0, y: 0})]: {revealed: true}}};
    nock(getTestBaseUrl())
      .post('/api/game', body => {
        savedData = body;
        return true;
      }).reply(200);

    wrapper = mount(
      <Game/>,
       {attachTo: document.createElement('div')}
    );

    driver.clickCellAt({wrapper, index: 0});
    driver.saveGame({wrapper, gameName: gameExpectedData.name});
    return eventually(() => expect(savedData).to.eql(gameExpectedData));
  });
});
