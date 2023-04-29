function matchesWonPerTeam (WorldCupMatches){
    if(!Array.isArray(WorldCupMatches)) {
        throw new Error("Invalid Input Type");
    }
    const winnerFreq = WorldCupMatches.reduce ((acc, match)=>{
        let winner;
        if(match['MatchID']==='') return acc;
        let homeGoals=match['Home Team Goals'], awayGoals=match['Away Team Goals'];
        if(parseInt(homeGoals)!=homeGoals || parseInt(awayGoals)!=awayGoals){
            throw new Error("Number of goals are not valid");
        }
        if(homeGoals>awayGoals) {
            winner = match['Home Team Name']
        }
        else if(homeGoals<awayGoals)winner = match['Away Team Name']
        if(typeof(winner)==='string'){
            if(acc[winner]) acc[winner]++;
            else if (winner!=='') acc[winner]=1;
        }
        return acc;
    },{})
    return winnerFreq;
}

module.exports = matchesWonPerTeam;