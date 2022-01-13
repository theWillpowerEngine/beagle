require('module-alias/register')
const { app, BrowserWindow } = require('electron')
const registerInterop = require("./src/interop")

function createWindow () {
  app.on('window-all-closed', () => {
    app.quit()
  })

  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    frame: false,
    show: true,
//    icon: __dirname + '/stuff/icon.ico',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

    win.setFullScreen(true)
    //win.openDevTools()
    
    win.loadFile('index.htm')
    registerInterop(win)
  }

  app.whenReady().then(() => {
    createWindow()
  })