const xpCumulativeCosts= [1, 3, 7, 15, 27, 40, 55, 70, 90, 110]

module.exports = (engine) => {
    var player = {
        zelaznyAttrs: {
            test: 0,
        },

        //Aspects
        power: 0,       powerActual: 0,
        grace: 0,       graceActual: 0,
        mind: 0,        mindActual: 0,
        spirit: 0,      spiritActual: 0,
        luck: 0,        luckActual: 0,

        incrementSkill(skill, amt) {
            if(!player[skill] && player[skill] !== 0)
                throw "Invalid skill (can't increment): " + skill

            player[skill+"Actual"] += amt
            
            var actual = player[skill+"Actual"]
            var skillVal = player[skill]

            while(skillVal < 10 && actual >= xpCumulativeCosts[skillVal]) {
                skillVal += 1
            }

            player[skill] = skillVal

            return skillVal
        },
    }

    return player
}