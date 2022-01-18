const ui = {
    inZelazny: false,

    modal(content, cb) {
        escStack.push(() => { if(cb) cb() })
        setTimeout(() => {
            $.modal(content, {
                position: ["20%","20%"],
                containerCss:{
                    height:"60%", 
                    width:"60%"
                },
                autoResize:true,
                autoPosition: true
            })
        }, 0)
    },

    async zelazny(story, file, allowEsc) {
        let Z = game.zelazny
        var content = await game.getZelazny(story, file)
        content = Z.parse(content)
        if(Z.over)
            content += `<br /><br /><center>${Z.over}</center><br /><center><a class="zelazny-close" onclick='escStack.pop()(1)'>Close</a></center>`

        $("#zelazny").html(content)

        let bind = () => {
            if(!Z.over)
                $(".action-link").off('click').on('click', e => {
                    var $t = $(e.target)
                    var action = $(`[data-id=${$t.attr("data-action")}]`).text()
                    
                    var text = Z.action(action)
                    if(Z.over)
                        text += `<br /><br /><center>${Z.over}</center><br /><center><a class="zelazny-close default-link" onclick='escStack.pop()(1)'>Close</a></center>`
        
                    $("#zelazny").html(text)
                    bind()
                })
        }
        bind()

        ui.inZelazny = true
        $("#zelazny").fadeIn()

        escStack.push((v) => {
            if(!allowEsc && !v)
                return true

            Z.done()
            $("#zelazny").fadeOut()
            ui.inZelazny = false
        })
    },

    async drawFrame() {
        //await game.tick()

        new Canvas('game', 0, function() {
            // Clear the canvas
            this.clear();
    
            // Fill a string at given xy-coordinates
            this.fillText('Hello World! This is html canvas library ' + this.getVersion(), 20, 20);
        });

    }
}