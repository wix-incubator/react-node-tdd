import React from 'react';
import {expect} from 'chai';
import nock from 'nock';
import {mount} from 'enzyme';
import Game from './Game';
import {MemoryRouter} from 'react-router';
import {Route} from 'react-router-dom';
import {getTestBaseUrl, eventually} from '../../../test/test-common';

const driver = {
  saveGame: ({wrapper, gameName}) => {
    wrapper.find('[data-hook="game-name-input"]').simulate('change', {target: {value: gameName}});
    wrapper.find('[data-hook="game-save"]').simulate('click');
  },
  clickCellAt: ({wrapper, index}) => wrapper.find('[data-hook="cell"]').at(index).simulate('click'),
  isCelRevealedAt: ({wrapper, index}) => wrapper.find('[data-hook="cell"]').at(index).hasClass('revealed'),
  getGameName: ({wrapper}) => wrapper.find('[data-hook="game-name-input"]').get(0).value
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

  it('should load a saved game', () => {
    const savedGame = {
      name: 'Yaniv',
      board: {
        [JSON.stringify({x: 0, y: 0})]: {revealed: true}}
    };

    nock(getTestBaseUrl()).get(`/api/game/${savedGame.name}`).reply(() => savedGame);

    wrapper = mount(
      <MemoryRouter initialEntries={[`/${savedGame.name}`]}>
        <Route path="/:gameName" component={Game}/>
      </MemoryRouter>,
       {attachTo: document.createElement('div')}
    );

    return eventually(() => {
      expect(driver.isCelRevealedAt({wrapper, index: 0})).to.eql(true);
      expect(driver.getGameName({wrapper})).to.eql(savedGame.name);
    });
  });

  it('should reveal multiple cells', () => {
    wrapper = mount(
      <Game/>,
       {attachTo: document.createElement('div')}
    );

    driver.clickCellAt({wrapper, index: 0});
    driver.clickCellAt({wrapper, index: 1});

    expect(driver.isCelRevealedAt({wrapper, index: 0})).to.eql(true);
    expect(driver.isCelRevealedAt({wrapper, index: 1})).to.eql(true);
  });
});
