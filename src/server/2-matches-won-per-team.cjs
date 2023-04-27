function matchesWonPerTeam (WorldCupMatches){
    const winnerFreq = WorldCupMatches.reduce ((acc, match)=>{
        let winner;
        if(match['Home Team Goals']>match['Away Team Goals']) {
            winner = match['Home Team Name']
        }
        else if(match['Home Team Goals']<match['Away Team Goals'])winner = match['Away Team Name']

        if(acc[winner]) acc[winner]++;
        else if (winner!=='' && winner!==undefined) acc[winner]=1;
        return acc;
    },{})
    return winnerFreq;
}

module.exports = matchesWonPerTeam;