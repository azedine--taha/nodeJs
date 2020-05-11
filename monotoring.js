const express = require('express')
const router = express.Router();
const Binance = require('node-binance-api');
var notifier = require('node-notifier')
const open = require('open');
const symbols = require('./constants')


const binance = new Binance().options({
    APIKEY: 'rpDyfMXLyikEkVOrSYMdcWNY5a1VcQXb2WPzE7zXPNIMNyquah4l9wvWM3fJSTm1',
    APISECRET: 'Rm5EuCRedPSKZEwvKqVAhp7hHn9R2fhCL1QvuLRrT1i5K4yxpyfGse40U0kacAHm',
    useServerTime: true,
    recvWindow: 60000, // Set a higher recvWindow to increase response timeout
    verbose: true, // Add extra output when subscribing to WebSockets, etc
    log: log => {
        console.log(log); // You can create your own logger here, or disable console output
    }
})


async function candle(symbol) {

    binance.websockets.candlesticks([symbol], "3m", (candlesticks) => {
        let { e: eventType, E: eventTime, s: symbol, k: ticks } = candlesticks;
        let { o: open, h: high, l: low, c: close, v: volume, n: trades, i: interval, x: isFinal, q: quoteVolume, V: buyVolume, Q: quoteBuyVolume } = ticks;

        const pourcentage = ((high - open) / open) * 100;
        console.log('its ok');

        if (pourcentage > 5) {
            //console.info(symbol + " " + interval + " candlestick update" + "% " + pourcentage);
            notifier.notify({
                title: symbol,
                message: "D U M :)",
                wait: true
            });
        }
    });

}


router.get('/', (req, resp, next) => {
    const data = symbols.coins;
    data.forEach(symbol => {
        try {
            candle(symbol)
        } catch (err) {
            console.log(err + " " + symbol);

        }
    }).then().catch(err => err)
})

module.exports = router;