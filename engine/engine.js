const Color = require('color')
const { ipcRenderer } = require("electron")
const makePlayer = require("@eng/player")
const makeZelazny = require("zelazny")
const makeRenderer = require("@render/renderer")
const fs = require('fs')
const terrainGen = require("@eng/gens/terrain")

module.exports = () => {

    let getZelaznyConfigObject = (eng) => {
        return {
            macros: {
                load(pop, expect) {
                    try {
                        var content = fs.readFileSync(`zelazny\\nodes\\${pop()}.z`, 'utf8')
                        eng.zelazny.parse(content, true)
                    } catch (ex) {
                        console.error(`Bad attempt to load zelazny: ` + ex)
                    }
                }
            },
            
            specialLinks: {
                '$' : `<a class='action-link default-link' data-action='[v __id]'>[v __text]</a><span class='action-span' data-id='[v __id]'>[v __action]</span>`,
                '*' : `<li class='action-link-li'><a class='action-link' data-action='[v __id]'>[v __text]</a><span class='action-span' data-id='[v __id]'>[v __action]</span></li>`
            }
        }
    }

    let engine = {
        config: {
            mapSize: 4,
            tileSize: 10,
        },
        gameOver: false,
        
        player: null,
        renderer: null,
        zelazny: null,

        terrain: [],
        items: [],
        mobs: [],

        _objects: null,
        objects(clear) {
            if(clear)
                engine._objects = null

            if(engine._objects == null)
                engine._objects = [
                    engine.player,
                    ...engine.items,
                    ...engine.mobs
                ]

            return engine._objects
        },

        async getZelazny(group, node) {
            if(node)
                return await ipcRenderer.invoke("zelazny", group + "\\" + node)
            else
                return await ipcRenderer.invoke("zelazny", group)
        },

        startUp: {
            makeWorld() {
                engine.terrain = terrainGen(engine)
                engine.renderer.height = engine.terrain.length
                engine.renderer.width = engine.terrain.length
            }
        },

        async init(cfg) {
            engine.config = {
                ...engine.config,
                ...cfg
            }

            engine.zelazny = makeZelazny(engine, {}, getZelaznyConfigObject(engine))
            engine.player = makePlayer(engine)
            engine.renderer = makeRenderer(engine)
        },

        ticks: 0,
        async tick() {
            engine.ticks += 1
            if(that.gameOver)
                throw that.gameOver

            
        }
    }

    return engine
}