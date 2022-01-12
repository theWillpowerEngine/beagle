const { ipcRenderer } = require("electron")

window.onerror = function(msg, url, line, col, error) {
    var extra = !col ? '' : '\ncolumn: ' + col
    extra += !error ? '' : '\nerror: ' + error
    console.warn(extra)

    ipcRenderer.invoke("showDev")
    return false
}

$(() => {
    binds.init()
    setTimeout(() => {
        ui.modal("Welcome to the game", () => {console.log("good")})
    }, 250)
})