var random = require('rng')
var R = new random.MT()     //can pass seed here

var that = module.exports = {
    roll(max) {
        return R.range(1, max+1)
    },
}