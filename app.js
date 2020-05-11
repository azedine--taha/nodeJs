const express = require('express')
const binance = require('./monotoring')
const app = express()

app.use('/binance', binance)

module.exports = app;