import server from '../src/server';

const app = server();
export const beforeAndAfter = (port = 3100) => {
  before(() => new Promise(resolve => app.listen(port, resolve)));
};

export const browserAfterEach = () =>
  afterEach(() => {
    browser.executeScript(() => {
      /* global document */
      document.cookie = 'connect.sid=';
    });
  });
