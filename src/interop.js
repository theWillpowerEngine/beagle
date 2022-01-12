let { ipcMain } = require("electron")
const fs = require('fs')

module.exports = (win) => {
    let browser = win
    let fullscreen = true

    ipcMain.handle("showDev", (event, line) => {
        browser.openDevTools()
    })

    ipcMain.handle("toggleFullscreen", (event, line) => {
        browser.setFullScreen(!fullscreen)
        fullscreen = !fullscreen
    })
}