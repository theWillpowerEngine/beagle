let { ipcMain } = require("electron")
const fs = require('fs')

module.exports = (win) => {
    let browser = win
    let fullscreen = true

    //////////////////////////////
    //Browser Interop
    ipcMain.handle("showDev", (event, line) => {
        browser.openDevTools()
    })

    ipcMain.handle("toggleFullscreen", (event, line) => {
        browser.setFullScreen(!fullscreen)
        fullscreen = !fullscreen
    })

    //////////////////////////////
    //File System Stuff
    ipcMain.handle("zelazny", (event, topic) => {
        try {
            var data = fs.readFileSync(`zelazny\\nodes\\${topic}.n`, 'utf8')
            return data
        } catch(ex) {
            return "Zelazny '" + topic + "' was not found"
        }
    })
}