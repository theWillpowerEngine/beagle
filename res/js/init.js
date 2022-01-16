const { ipcRenderer } = require("electron")
const makeEngine = require("engine")
const species = require("@enum/species")

window.onerror = async function(msg, url, line, col, error) {
    var extra = !col ? '' : '\ncolumn: ' + col
    extra += !error ? '' : '\nerror: ' + error
    console.warn("Global Unhandled Exception:  " + extra)

    await ipcRenderer.invoke("showDev")
    return false
}

window["starts"] = {
    "Prismatic Dragon": eng => {
        game.player.species = species.prismatic
    },
    "Swarm Host": eng => {
        game.player.species = species.host
    },
    "Mist Dragon": eng => {
        game.player.species = species.mist
    },
}

function doStart(start) {
    starts[start](game)
}

$(async () => {
    binds.init()
    window["game"] = makeEngine()

    await game.init()
    game.zelazny.macros["start"] = pop => {
        try {
            doStart(species[pop()])
        } catch (ex) {
            console.error(`Could not start: ` + ex)
        }
    }

    setTimeout(async () => {
        //ui.modal("Welcome to the game", () => {console.log("good")})
        await ui.zelazny("hello")
    
    }, 250)

})