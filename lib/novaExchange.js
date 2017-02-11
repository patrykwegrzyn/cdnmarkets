"use strict"

const fetch = require('node-fetch');
const makeId = require('./makeId');

const API_URL = 'https://novaexchange.com/remote/v2/markets/';
const EXCHANGE = 'Novaexchange';

module.exports = function getMarketData ( callback ) {
  fetch( API_URL ).then(r => r.json())
  .then(data => {
    let cdnMarkets =  data.markets
      .filter( m => m.marketname.includes('CDN' ) )
      .map( ( val ) => {
        let pairSplit = val.marketname.split("_");

        return {
          id: makeId(EXCHANGE, val.marketname),
          exchange: EXCHANGE,
          pair: val.marketname,
          base: pairSplit[0],
          symbol :pairSplit[1],
          ask: Number(val.ask),
          bid: Number(val.bid),
          volume : Number(val.volume24h),
          change : Number(val.change24h)
        };

    });

    callback( null, cdnMarkets );

  }).catch(e => callback( e ) );
};
