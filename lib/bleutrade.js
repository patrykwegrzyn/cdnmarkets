
const fetch = require( "node-fetch" );
const makeId = require( "./makeId" );

const API_URL = "https://bleutrade.com/api/v2/public/getmarketsummaries";
const EXCHANGE = "Bleutrade";

module.exports = function getMarketData( callback ) {
  fetch( API_URL ).then( r => r.json() )
  .then( data => {
    let cdnMarkets =  data.result
    .filter( m => m.MarketName.includes( "CDN" ) ).map( ( val ) => {

      let pairSplit = val.MarketName.split( "_" );

      return {
        id: makeId( EXCHANGE, val.Label ),
        exchange: EXCHANGE,
        pair: val.MarketName,
        base: pairSplit[ 1 ],
        symbol:pairSplit[ 0 ],
        ask: Number( val.Ask ),
        bid:Number( val.Bid ),
        volume: Number( val.Volume ),
        change: Number( 100 - Number( val.PrevDay ) / Number( val.Average ) * 100 ).toFixed( 2 )
      };

    } );

    callback( null, cdnMarkets );

  } ).catch( e => callback( e ) );
};
