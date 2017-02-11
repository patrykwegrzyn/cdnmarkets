
var crypto = require('crypto');


module.exports =  function makeId(exchange, pair) {
  return crypto.createHash('md5')
  .update(exchange + pair).digest('hex');
};
