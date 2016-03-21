
require('babel-core/register')({
  presets: ['es2015', 'stage-0', 'react']
});

require('babel-polyfill');

require('../src/server/server');