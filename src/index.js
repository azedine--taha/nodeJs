var Twitter = require('twitter')
var franc = require('franc')
var notifier = require('node-notifier')
const open = require('open');

const apikey = 'JUffkkIEwSs7t23yS1lyaEsxC'
const apisecretKey = 'IzZS7SpHq6g2KByVwjTuQZM91ZVuid4HoWf8R5t20EQHSLGjxo'
const acesstoken = '1243192163162296327-l7IRI4mhNySqVhQTXDv8KAYOie9tei'
const accesstokenSecret = 'hs06LD68whiLUofEzCfjKtdQVSBaQYAuOF3sTy9RKEPgx'

var client = new Twitter({
    consumer_key: apikey,
    consumer_secret: apisecretKey,
    access_token_key: acesstoken,
    access_token_secret: accesstokenSecret
})


/* (async () => {
     client.get('search/tweets', { q: '@OAX_Foundation', count: 10 }, function (error, data, response) {
         const tweets = data.statuses
             .map(tweet => tweet.text)
         //.filter(tweet => tweet.toLowerCase().includes('Announcing'))
         console.log(tweets);

     });
 })();

client.get('search/tweets', { q: '@EnigmaMPC since:2020-05-05', count: 10 }, function (err, data, response) {
    const tweets = data.statuses
        .map(tweet => `LANG ${franc(tweet.text)} : ${tweet.text}`)
        .filter(tweet => tweet.toLowerCase().includes('announcement'))
    console.log(tweets);

})*/

var listUser = '@streamr,@Tierion,@OAX_Foundation,@maticnetwork,@wabitoken,@agrelloapp,' +
    '@FunFairTech,@Theta_Network'
var stream = client.stream('statuses/filter', {
    track: listUser
});
stream.on('data', function (event) {
    /*event = '@streamr'
    event.text = 'announcing'
    var text = event.text.toLowerCase()*/
    console.log('event => ' + event);
    console.log('event text ' + event.text);


    // if (text.includes['pump'] || text.includes['partnership']|| text.includes['announcing']) {

    console.log(JSON.stringify(event) && event.text);
    let url = `https://twitter.com/${event.user.screen_name}/status/${event.id_str}`

    notifier.notify({
        title: event,
        message: event.text,
        wait: true
    });

    notifier.on('click', async function (notifierObject, options, event) {
        console.log('clicked');
        await open(url);
    });
    //}
});

stream.on('error', function (error) {
    throw error;
});