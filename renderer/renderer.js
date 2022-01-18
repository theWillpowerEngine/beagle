const colors = require("@render/colors")

module.exports = (eng) => {
    let engine = eng

    var renderer = {
        height: 0,  width: 0,
        tiles: require("@render/tiles/tiles"),

        fullRender($game) {
            const terrain = engine.terrain
            const ctx = $game[0].getContext("2d");

            ctx.strokeStyle = colors.white
            ctx.fillStyle = colors.darkWater
            ctx.font="15pt Georgia";
            ctx.strokeText("Hello Nurse",10,50);
            return

            var displayWidth = Math.floor($game.width() / engine.config.tileSize),
            displayHeight = Math.floor($game.height() / engine.config.tileSize)

            var offsetX = 0, offsetY = 0
            var pX = engine.player.x, pY = engine.player.y
            
            if(map.width < displayWidth)
                displayWidth = map.width
            else
                offsetX = pX - Math.floor(displayWidth / 2)
            if(map.height < displayHeight)  
                displayHeight = map.height
            else
                offsetY = pY - Math.floor(displayHeight / 2)

            if(offsetX < 0) offsetX = 0
            if(offsetX > map.width - displayWidth) offsetX = map.width - displayWidth
            if(offsetY < 0) offsetY = 0
            if(offsetY > map.height - displayHeight) offsetY = map.height - displayHeight
        }
    
    
    }

    return renderer
}