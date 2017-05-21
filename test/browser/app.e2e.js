import {expect} from 'chai';
import 'babel-polyfill';
import {beforeAndAfter, browserAfterEach} from '../environment';

const appDriver = {
  navigate: (url = '/') => browser.get(url),
  clickNewGame: () => $(`[data-hook=new-game]`).click(),
  getSavedGames: () => $$(`[data-hook=game]`).map(el => el.getText())
};

const gameDriverFactory = () => ({
  getRows: () => $$('[data-hook=row]'),
  getCells: () => $$('[data-hook=cell]'),
  saveGame: async game => {
    await $('[data-hook=game-name-input]').clear().sendKeys(game.name);
    await $('[data-hook=game-save]').click();
  }
});

describe('React application', () => {
  beforeAndAfter();
  browserAfterEach();

  const gameDriver = gameDriverFactory();

  it('should create a new game', async () => {
    await appDriver.navigate();
    await appDriver.clickNewGame();
    expect(await gameDriver.getRows().count()).to.eql(10);
    expect(await gameDriver.getCells().count()).to.eql(100);
  });

  it('should save new game', async () => {
    const game = {name: 'yaniv'};
    await appDriver.navigate();
    await appDriver.clickNewGame();
    await gameDriver.saveGame(game);
    await appDriver.navigate();
    expect(await appDriver.getSavedGames()).to.eql([game.name]);
  });
});
