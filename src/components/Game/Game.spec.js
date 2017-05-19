import React from 'react';
import {expect} from 'chai';
import nock from 'nock';
import {mount} from 'enzyme';
import tp from 'trier-promise';
import Game from './Game';
import {getTestBaseUrl} from '../../../test/test-common';

const driver = {
  saveGame: ({wrapper, gameName}) => {
    wrapper.find('[data-hook="game-name-input"]').simulate('change', {target: {value: gameName}});
    wrapper.find('[data-hook="game-save"]').simulate('click');
  }
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
    const gameData = {name: 'Yaniv', board: {}};
    nock(getTestBaseUrl())
      .post('/api/game', body => {
        savedData = body;
        return true;
      }).reply(200);

    wrapper = mount(
      <Game/>,
       {attachTo: document.createElement('div')}
    );

    driver.saveGame({wrapper, gameName: gameData.name});
    return eventually(() => expect(savedData).to.eql(gameData));
  });
});

function eventually(action) {
  return tp({
    action,
    timeout: 10000,
    interval: 200
  });
}
