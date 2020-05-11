
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

/*
async function test() {
    await binance.useServerTime();
    binance.balance((error, balances) => {
        if (error) return console.error(error);
        console.info("balances()", balances);
        //console.info("BNB balance: ", balances.BNB.available);
    });
}
test() */



async function candle(symbol) {

    binance.websockets.candlesticks([symbol], "3m", (candlesticks) => {
        let { e: eventType, E: eventTime, s: symbol, k: ticks } = candlesticks;
        let { o: open, h: high, l: low, c: close, v: volume, n: trades, i: interval, x: isFinal, q: quoteVolume, V: buyVolume, Q: quoteBuyVolume } = ticks;

        const pourcentage = ((open - close) / close) * 100
        if (pourcentage > 10) {
            //console.info(symbol + " " + interval + " candlestick update" + "% " + pourcentage);
            notifier.notify({
                title: symbol,
                message: "D U M :)",
                wait: true
            });
        }
    });

}

async function ticker() {
    let ticker = await binance.prices();
    console.info(`Price of wabi: ${JSON.stringify(ticker.WABIBTC)}`);

    if (ticker.BTCUSDT < 9400) {
        notifier.notify({
            title: "BTC",
            message: "Dump",
            wait: true
        });
    }
}

//ticker()
function test() {
    const data = symbols.coins;
    data.forEach(symbol => {
        try {
            candle(symbol)
        } catch (err) {
            console.log(err + " " + symbol);

        }
    })
}

setInterval(test, 15000);

// binance.exchangeInfo((err, data) => {
//     if (err) {
//         console.log('exchangeInfo error -> ' + err)
//     }
//     let minimums = {};
//     try {
//         let filters = data.symbols.filter(d => {
//             if (d.symbol.includes('USD')) {
//                 console.log(d.symbol);
//             }
//         })

//     } catch (error) {
//         console.log('Glogal Error -> ' + error)
//     }
// })