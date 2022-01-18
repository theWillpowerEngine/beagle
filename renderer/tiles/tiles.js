var colors = require("@render/colors")
var Color = require("color")

const makeTile = (vals) => {
    return {
        solid: true,
        height: 0,
        char: ' ',
        color: colors.white,
        bg: colors.bg,
        desc: "A tile",
        ...vals
    }
}

var that = module.exports = {
    makeTile: makeTile,
    merge(base, extra) {
        return {
            ...base,
            ...extra,
        }
    },

    blueWater: makeTile({        
        solid: false,
        char: "~",
        color: colors.darkWater,
        desc: "deep water"
    }),

    water: makeTile({        
        solid: false,
        char: "~",
        color: colors.water,
        desc: "water"
    }),

    sand: makeTile({        
        solid: false,
        char: ".",
        color: colors.sand,
        desc: "terrain"
    }),

    terrain: makeTile({        
        solid: false,
        char: ".",
        color: colors.terrain,
        desc: "terrain"
    }),

    hills: makeTile({        
        solid: false,
        char: "-",
        color: colors.elevated,
        desc: "hills"
    }),

    highland: makeTile({        
        solid: false,
        char: "=",
        color: colors.elevated,
        desc: "highlands"
    }),

    mountain: makeTile({        
        solid: false,
        char: "^",
        color: colors.white,
        desc: "a mountain range"
    }),
}