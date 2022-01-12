const { ipcRenderer } = require("electron")

window.onerror = function(msg, url, line, col, error) {
    var extra = !col ? '' : '\ncolumn: ' + col
    extra += !error ? '' : '\nerror: ' + error
    console.warn(extra)

    ipcRenderer.invoke("showDev")
    return false
}

$(() => {
    window["binds"] = require("@/binds")
})