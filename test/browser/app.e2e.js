import {expect} from 'chai';
import 'babel-polyfill';

const appDriver = {
  navigate: (url = '/') => browser.get(url),
  clickNewGame: () => $(`[data-hook=new-game]`).click()
};

const gameDriver = {
  getRows: () => $$('[data-hook=row]'),
  getCells: () => $$('[data-hook=cell]')
};

describe('React application', () => {
  it('should create a new game', async () => {
    await appDriver.navigate();
    await appDriver.clickNewGame();
    expect(await gameDriver.getRows().count()).to.eql(10);
    expect(await gameDriver.getCells().count()).to.eql(100);
  });
});
