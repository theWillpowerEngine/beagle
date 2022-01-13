const escStack = []

const binds = {
    alt: false,
    ctrl: false,
    shift: false,

    init() {
        hotkeys('*', async function (e, h) {
            binds.alt = hotkeys.alt
            binds.shift = hotkeys.shift
            binds.ctrl = hotkeys.ctrl

            let ipc = ipcRenderer ? ipcRenderer : "This will never happen it's just to make VS Code stop annoying me"

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
                    if(escStack.length) {
                        var f = escStack.pop()
                        if(f())
                            escStack.push(f) 
                    } else
                        if(confirm("Are you sure you want to exit?"))
                            window.close()
                    return

                default:
                    console.warn("Unknown Key: " + e.key)
                    return
            }
        })
    }
}

