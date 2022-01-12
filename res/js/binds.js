
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

            switch(e.key.toLowerCase()) {
                //Ignore
                case "alt":
                case "shift":
                case "control":
                    return

                //Hard Binds
                case "enter":
                    if(binds.alt)
                        await ipcRenderer.invoke("toggleFullscreen")
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

