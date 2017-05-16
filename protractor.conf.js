const port = 3100;

exports.config = {
  framework: 'mocha',
  SELENIUM_PROMISE_MANAGER: false,
  specs: ['test/**/*.e2e.js'],
  baseUrl: `http://localhost:${port}/`,
  onPrepare() {
    browser.ignoreSynchronization = true;
  }
};
