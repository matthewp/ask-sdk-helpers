const { suite } = require('uvu');
const assert = require('uvu/assert');
const {
  ssml,
  pause
} = require('../ssml.js');

const SSML = suite('SSML');

SSML('break() gives a pause', () => {
  let output = ssml(
    'Testing',
    pause('2s'),
    'one two'
  ).toString();
  
  assert.equal(output, 'Testing<break time="2s"/>one two');
});

SSML.run();