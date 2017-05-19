import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import nock from 'nock';
import tp from 'trier-promise';
import {StaticRouter} from 'react-router';
import App from './App';
import {getTestBaseUrl} from '../../../test/test-common';

describe('App', () => {
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

  it('should load saved games', () => {
    const games = [{name: 'yaniv', board: {}}];
    const context = {};
    nock(getTestBaseUrl()).get('/api/games').reply(() => games);

    wrapper = mount(
      <StaticRouter context={context}>
        <App/>
      </StaticRouter>, {attachTo: document.createElement('div')}
    );

    return eventually(() =>
      expect(wrapper.find('[data-hook="game"]').text()).to.eql(games[0].name));
  });
});

function eventually(action) {
  return tp({
    action,
    timeout: 10000,
    interval: 200
  });
}
