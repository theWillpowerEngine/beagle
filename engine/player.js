const xpCumulativeCosts= [1, 2, 5, 10, 15, 20, 27, 35, 45, 56]

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

        //Attributes
        piloting: 0,    pilotingActual: 0,
        sensors: 0,     sensorsActual: 0,
        melee: 0,       meleeActual: 0,
        targeting: 0,   targetingActual: 0,
        missiles: 0,    missilesActual: 0,
        guns: 0,        gunsActual: 0,
        lasers: 0,      lasersActual: 0,
        mechanics: 0,   mechanicsActual: 0,
        social: 0,      socialActual: 0,
        science: 0,     scienceActual: 0,

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