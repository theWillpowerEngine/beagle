const { ipcRenderer } = require("electron")
const makeEngine = require("engine")

window.onerror = async function(msg, url, line, col, error) {
    var extra = !col ? '' : '\ncolumn: ' + col
    extra += !error ? '' : '\nerror: ' + error
    console.warn("Global Unhandled Exception:  " + extra)

    await ipcRenderer.invoke("showDev")
    return false
}

$(async () => {
    binds.init()
    window["game"] = makeEngine()

    await game.init()

    setTimeout(async () => {
        //ui.modal("Welcome to the game", () => {console.log("good")})
        await ui.zelazny("hello")
    
    }, 250)

})