var rpg = require("@src/rpg")

var that = module.exports = {
    pickOne(array) {
        var i = rpg.roll(array.length)-1
        var item = array[i]
        array.splice(i, 1)
        return item
    }
}