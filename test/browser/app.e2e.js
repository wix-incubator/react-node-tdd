import {expect} from 'chai';
import 'babel-polyfill';
import {beforeAndAfter, browserAfterEach} from '../environment';

const appDriverFactory = () => {
  const games = $$(`[data-hook=game]`);
  return {
    navigate: (url = '/') => browser.get(url),
    clickNewGame: () => $(`[data-hook=new-game]`).click(),
    getSavedGames: () => games.map(el => el.getText()),
    loadAGameAt: index => games.get(index).click()
  };
};

const gameDriverFactory = () => {
  const cells = $$('[data-hook=cell]');
  return {
    getRows: () => $$('[data-hook=row]'),
    getCells: () => cells,
    saveGame: async game => {
      await $('[data-hook=game-name-input]').clear().sendKeys(game.name);
      await $('[data-hook=game-save]').click();
    },
    clickACellAt: index => cells.get(index).click(),
    getCellAt: index => cells.get(index)
  };
};

describe('React application', () => {
  beforeAndAfter();
  browserAfterEach();

  const gameDriver = gameDriverFactory();
  const appDriver = appDriverFactory();

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

  it('should load a saved game', async () => {
    const game = {name: 'yaniv'};
    await appDriver.navigate();
    await appDriver.clickNewGame();
    await gameDriver.clickACellAt(0);
    await gameDriver.saveGame(game);
    await appDriver.navigate();
    await appDriver.loadAGameAt(0);
    expect(await gameDriver.getCellAt(0).getAttribute('class')).to.contain('revealed');
  });
});
