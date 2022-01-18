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

function startGame() {
    game.startUp.makeWorld()
}

window["starts"] = {
    "Prismatic Dragon": eng => {
        game.player.species = species.prismatic
        startGame()
    },
    "Swarm Host": eng => {
        game.player.species = species.host
        startGame()
    },
    "Mist Dragon": eng => {
        game.player.species = species.mist
        startGame()
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
        //try {
            doStart(species[pop()])
        //} catch (ex) {
        //    console.error(`Could not start: ` + ex)
        //}
    }

    setTimeout(async () => {
        await ui.zelazny("hello")
    }, 250)

})