const arr = [
    { symbol: "BTCUSDT", prices: 9999, PRCENTAGE: 2 },
    { symbol: "ZRXBTC", prices: 0.5, PRCENTAGE: 2 },
    { symbol: "BTCUSDT", prices: 9999, PRCENTAGE: 2 },
    { symbol: "BTCUSDT", prices: 9999, PRCENTAGE: 2 },

]

var a = reduce(arr)

function reduce(array) {
    array.reduce((accumulator, current) => {
        if (checkIfAlreadyExist(current)) {
            return accumulator;
        } else {
            return [...accumulator, current];
        }
    })
}

function checkIfAlreadyExist(currentVal) {
    return accumulator.some((item) => {
        return (item.symbol === currentVal.symbol &&
            item.PRCENTAGE === currentVal.PRCENTAGE);
    });
}
}, []);

console.log(a);
