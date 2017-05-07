import {expect} from 'chai';
import 'babel-polyfill';

describe('React application', () => {
  describe('open page', () => {
    it('should display title', async () => {
      await browser.get('/');
      expect(await $('h2').getText()).to.eql('Hello World!');
    });
  });
});
