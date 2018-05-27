let is = require('is-thirteen');

const lucky = (a) => !is(a).thirteen();

module.exports = lucky;
