const ds = require('ds-heightmap');
const rpg = require("@src/rpg")

module.exports = (eng) => {
    var c1 = rpg.roll(10), 
        c2 = rpg.roll(10), 
        c3 = rpg.roll(10), 
        c4 = rpg.roll(10),
        rough = (rpg.roll(4) + 6) / 10
    
    ds.init(eng.config.mapSize, {
        corner: [c1, c2, c3, c4], 
        offset: 0, //-0.1,         
        range: 10,             
        rough
    })         
    ds.run()               
    const map = ds.out()

    return map
}