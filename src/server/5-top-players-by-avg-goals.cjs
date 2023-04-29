const mapObject = require('./mapObject.cjs');

function top10Players(WorldCupPlayers) {
    if(!Array.isArray(WorldCupPlayers)) {
        throw new Error("Invalid Input Type");
    }
    let goalsByPlayers = getGoalsByPlayers(WorldCupPlayers);
    let matchesCount = getMatchesPlayedByPlayers(WorldCupPlayers);

    let avgGoalsPerMatch = mapObject(goalsByPlayers,(goalCount,player)=>{
        return goalCount/matchesCount[player];
    })

    let top10Arr = Object.entries(avgGoalsPerMatch);
    top10Arr.sort((a, b) => b[1] - a[1]).splice(10);
    avgGoalsPerMatch = Object.fromEntries(top10Arr);
    return avgGoalsPerMatch;
}

function getGoalsByPlayers(WorldCupPlayers) {
    if(!Array.isArray(WorldCupPlayers)) {
        throw new Error("Invalid Input Type");
    }
    let goalsByPlayers = WorldCupPlayers.reduce((acc, match) => {
        let event = match.Event;
        if(event===undefined) return acc;
        if (event.includes('G')) {
            let goals = 0;
            for (let index = event.indexOf('G'); index < event.length; index++) {
                if (index === 0 || (event.charAt(index) === 'G' && event.charAt(index - 1) !== 'O')) goals++;
            }
            if (acc[match['Player Name']]) {
                acc[match['Player Name']] += goals;
            }
            else acc[match['Player Name']] = goals;
        }
        return acc;
    }, {})
    return goalsByPlayers;
}

function getMatchesPlayedByPlayers(WorldCupPlayers) {
    if(!Array.isArray(WorldCupPlayers)) {
        throw new Error("Invalid Input Type");
    }
    let matchesCount = WorldCupPlayers.reduce((acc,match)=>{
        let name = match['Player Name'];
        if (name===undefined) return acc;
        else {
            if(acc[name]) acc[name]++;
            else acc[name]=1;
            return acc; 
        }
    },{})
    return matchesCount
}

module.exports = {top10Players, getGoalsByPlayers, getMatchesPlayedByPlayers};
