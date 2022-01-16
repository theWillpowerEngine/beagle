const species = require("@enum/species")
const xpCumulativeCosts = [1, 3, 7, 15, 27, 40, 55, 70, 90, 110] 

module.exports = (engine) => {
    var player = {
        zelaznyAttrs: {
            test: 0,
        },

        species: species.prismatic,

        growth: 0.1,    growthRate: 1,
        
        capacity: 0.1,
        control: 0.1,
        rack: 0.1,

        hunger: 0,      hungerRate: 1.2,
        thirst: 0,      thirstRate: 1.2,

        //Aspects
        power: 0,   powerActual: 0,
        speed: 0,   speedActual: 0,
        mind: 0,    mindActual: 0,
        tech: 0,    techActual: 0,
        defense: 0, defenseActual: 0,
        sense: 0,   senseActual: 0,

        incrementSkill(skill, amt) {
            if(['growth', 'capacity', 'control', 'rack'].indexOf(skill) > -1) {
                if(skill == "growth")
                    player[skill] += (amt / (100 + player.growthRate + (player[skill] * 10)))
                else
                    player[skill] += (amt / (100 + (player[skill] * 10)))
            } else {
                if(!player[skill] && player[skill] !== 0)
                    throw "Invalid skill (can't increment): " + skill

                player[skill+"Actual"] += amt
                
                var actual = player[skill+"Actual"]
                var skillVal = player[skill]

                while(skillVal < 10 && actual >= xpCumulativeCosts[skillVal]) {
                    skillVal += 1
                }

                player[skill] = skillVal
            }

            return skillVal
        },
    }

    return player
}