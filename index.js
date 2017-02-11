const async = require('async');
const cryptopiaMarkets    = require('./lib/cryptopia');
const novaExchangeMarkets = require('./lib/novaExchange');
const bleutradeMarkets    = require('./lib/bleutrade');

module.exports = function cdnMarkets(callback) {
  async.parallel([
    cryptopiaMarkets,
    novaExchangeMarkets,
    bleutradeMarkets
  ], (err, results) => {
    return callback(err, [].concat.apply([], results));
  });
};
