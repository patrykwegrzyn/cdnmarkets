"use strict"

const fetch = require('node-fetch');
const makeId = require('./makeId');

const API_URL = 'https://www.cryptopia.co.nz/api/GetMarkets/0.1';
const EXCHANGE = 'Cryptopia';

module.exports = function getMarketData ( callback ) {
  fetch( API_URL ).then(r => r.json())
  .then(markets => {

    let cdnMarkets =  markets.Data
    .filter( m => m.Label.includes('CDN' ) ).map( ( val ) => {

      let pairSplit = val.Label.split('/');

      return {
        id: makeId(EXCHANGE, val.Label),
        exchange: EXCHANGE,
        pair: val.Label,
        base: pairSplit[1],
        symbol:pairSplit[0],
        ask: Number(val.AskPrice),
        bid: Number(val.BidPrice),
        volume : Number(val.Volume),
        change : Number(val.Change),
      };

    });

    callback( null, cdnMarkets );

  }).catch(e => callback( e ) );
};
