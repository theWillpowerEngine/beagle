const escStack = []
const bindActions = {
    advance: eng => {
        if(ui.inZelazny) {
            $(".default-link").click()
        }
    }
}

const binds = {
    alt: false,
    ctrl: false,
    shift: false,

    keyBinds: {
        'space': bindActions.advance
    },

    init() {
        hotkeys('*', async function (e, h) {
            binds.alt = hotkeys.alt
            binds.shift = hotkeys.shift
            binds.ctrl = hotkeys.ctrl

            let ipc = ipcRenderer ? ipcRenderer : "This will never happen it's just to make VS Code stop annoying me"

            try {
                switch(e.key.toLowerCase()) {
                    //Ignore
                    case "alt":
                    case "shift":
                    case "control":
                        return

                    //Hard Binds
                    case "f12":
                        await ipc.invoke("showDev")
                        return

                    case "enter":
                        if(binds.alt)
                            await ipc.invoke("toggleFullscreen")
                        return

                    case "escape":
                        //Kind of a 'secret' keybind to get rid of a zelazny dialog if you need to
                        if(binds.shift) {
                            game.zelazny.done()
                            $("#zelazny").fadeOut()
                            ui.inZelazny = false
                            escStack.pop()
                        }

                        if(escStack.length) {
                            var f = escStack.pop()
                            if(f())
                                escStack.push(f) 
                        } else
                            if(confirm("Are you sure you want to exit?"))
                                window.close()
                        return
                    
                    default:
                        var key = e.key.toLowerCase()
                        if(key == ' ') key = 'space'

                        if(binds.alt) key = "alt+" + key
                        if(binds.ctrl) key = "ctrl+" + key
                        if(binds.shift) key = "shift+" + key

                        if(binds.keyBinds[key])
                            binds.keyBinds[key](game)
                        else
                            console.warn("No bind for " + e.key)
                        return
                }
            } catch(bigE) {
                console.error(`Key Handler error, key '${e.key}, error: ${bigE}`)
            }
        })
    }
}

