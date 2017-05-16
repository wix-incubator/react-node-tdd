require('babel-polyfill');
const {getTestBaseUrl} = require('./test-common');

require('jsdom-global')(undefined, {url: getTestBaseUrl()});

