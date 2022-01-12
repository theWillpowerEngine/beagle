let { ipcRenderer } = require("electron")

window["escStack"] = []
window["commandKeys"] = []

let that = module.exports = {
    init() {
        hotkeys('alt+enter', async function(e, h){
            await ipcRenderer.invoke("toggleFullscreen")
        })
        hotkeys('escape', async function(e, h){
            if(escStack.length) {
                var f = escStack.pop()
                if(f())
                    escStack.push(f) 
            } else
                if(confirm("Are you sure you want to exit?"))
                    window.close()
        })
    }
}

