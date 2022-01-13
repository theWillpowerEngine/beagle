let { ipcMain } = require("electron")
const fs = require('fs')

module.exports = (win) => {
    let browser = win
    let fullscreen = true
    let rootPath = "."

    fs.readdir("./zelazny/nodes", (err, f) => {
        if(err) {
            fs.readdir("./resources/app/zelazny/nodes", (err2, f2) => {
                if(!err2)
                    rootPath = "./resources/app"
                else
                    throw "Support files not found"
            })
        }
    })


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
            var data = fs.readFileSync(rootPath + `\\zelazny\\nodes\\${topic}.z`, 'utf8')
            return data
        } catch(ex) {
            return "Zelazny '" + topic + "' was not found"
        }
    })
}