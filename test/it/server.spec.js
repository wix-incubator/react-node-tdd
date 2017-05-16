import {expect} from 'chai';
import axios from 'axios';
import {getTestBaseUrl} from '../test-common';
import {beforeAndAfter} from '../environment';

const axiosInstance = axios.create({
  baseURL: getTestBaseUrl(),
  adapter: require('axios/lib/adapters/http')
});

describe('Api', () => {

  beforeAndAfter();

  it('should save game', async () => {
    const game = {name: 'yaniv', board: {}};
    const resp = await axiosInstance.post('/api/game', game);
    const cookie = resp.headers['set-cookie'].pop();

    expect(resp.status).to.eql(200);

    const gamesResp = await axiosInstance.get('/api/games', {
      headers: {cookie}
    });

    expect(gamesResp.data).to.eql([game]);
  });
});

