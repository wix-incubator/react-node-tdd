import React from 'react';
import {expect} from 'chai';
import nock from 'nock';
import {mount} from 'enzyme';
import Game from './Game';
import {MemoryRouter} from 'react-router';
import {Route} from 'react-router-dom';
import sinon from 'sinon';
import {getTestBaseUrl, eventually} from '../../../test/test-common';
import boardService from '../../boardService';

const driver = {
  saveGame: ({wrapper, gameName}) => {
    wrapper.find('[data-hook="game-name-input"]').simulate('change', {target: {value: gameName}});
    wrapper.find('[data-hook="game-save"]').simulate('click');
  },
  clickCellAt: ({wrapper, index}) => wrapper.find('[data-hook="cell"]').at(index).simulate('click'),
  isCelRevealedAt: ({wrapper, index}) => wrapper.find('[data-hook="cell"]').at(index).hasClass('revealed'),
  getGameName: ({wrapper}) => wrapper.find('[data-hook="game-name-input"]').get(0).value,
  mount: () => mount(
    <Game/>,
    {attachTo: document.createElement('div')}
  ),
  mountWithRoute: route => mount(
    <MemoryRouter initialEntries={[route]}>
      <Route path="/:gameName" component={Game}/>
    </MemoryRouter>,
      {attachTo: document.createElement('div')}
  ),
  getMines: ({wrapper}) => wrapper.find('.mine'),
  isCellMineAt: ({wrapper, index}) => wrapper.find('[data-hook="cell"]').at(index).hasClass('mine')
};
describe('Game', () => {
  let wrapper;
  let sinonStub;

  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error(`pending mocks: ${nock.pendingMocks()}`);
    }
  });

  afterEach(() => {
    nock.cleanAll();
  });

  afterEach(() => wrapper.detach());

  afterEach(() => {
    if (sinonStub) {
      sinonStub.restore();
    }
  });

  it('should save a game', () => {
    let savedData;
    const randomMines = {
      [JSON.stringify({x: 9, y: 9})]: {mine: true}
    };

    sinonStub = sinon.stub(boardService, 'getRandomMines').returns(randomMines);

    const gameExpectedData = {name: 'Yaniv', board: {...randomMines, [JSON.stringify({x: 0, y: 0})]: {revealed: true}}};
    nock(getTestBaseUrl())
      .post('/api/game', body => {
        savedData = body;
        return true;
      }).reply(200);

    wrapper = driver.mount();

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
    wrapper = driver.mountWithRoute(`/${savedGame.name}`);

    return eventually(() => {
      expect(driver.isCelRevealedAt({wrapper, index: 0})).to.eql(true);
      expect(driver.getGameName({wrapper})).to.eql(savedGame.name);
    });
  });

  it('should reveal multiple cells', () => {
    wrapper = driver.mount();

    driver.clickCellAt({wrapper, index: 0});
    driver.clickCellAt({wrapper, index: 1});

    expect(driver.isCelRevealedAt({wrapper, index: 0})).to.eql(true);
    expect(driver.isCelRevealedAt({wrapper, index: 1})).to.eql(true);
  });

  it('should generate 10 mines', () => {
    wrapper = driver.mount();

    expect(driver.getMines({wrapper}).length).to.eql(10);
  });

  it('should generate random mines', () => {
    const randomMines = {
      [JSON.stringify({x: 0, y: 0})]: {mine: true},
      [JSON.stringify({x: 9, y: 9})]: {mine: true},
    };

    sinonStub = sinon.stub(boardService, 'getRandomMines').returns(randomMines);
    wrapper = driver.mount();

    expect(driver.isCellMineAt({wrapper, index: 0})).to.eql(true);
    expect(driver.isCellMineAt({wrapper, index: 11})).to.eql(false);
    expect(driver.isCellMineAt({wrapper, index: 98})).to.eql(false);
    expect(driver.isCellMineAt({wrapper, index: 99})).to.eql(true);
  });
});
