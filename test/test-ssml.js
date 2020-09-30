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
  
  assert.equal(output, 'Testing <break time="2s"/> one two');
});

SSML('can nest helpers', () => {
  let output = ssml(
    'one',
    pause('1s'),
    'two'
  );
  output = ssml(
    output,
    'three',
    ssml('four')
  ).toString();
  let expected = `one <break time="1s"/> two three four`;
  assert.equal(output, expected);
})

SSML.run();