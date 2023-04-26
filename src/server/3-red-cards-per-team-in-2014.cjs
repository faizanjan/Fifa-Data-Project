
function redCardsPerTeamInAYear(WorldCupMatches,WorldCupPlayers, year){
    const matchIdsForAYear = [];
    WorldCupMatches.map(match=>{
        if(parseInt(match.Year)===year) matchIdsForAYear.push(match.MatchID)
    })
    
    const redCardsPerTeam ={};
    WorldCupPlayers.map(match=>{
        if(matchIdsForAYear.includes(match.MatchID)){
            let event = match.Event;
            if(event.includes('R')){
                let freqKeys = Object.keys(redCardsPerTeam);
                if(freqKeys.includes(match['Team Initials'])) {
                    redCardsPerTeam[match['Team Initials']]++;
                }
                else redCardsPerTeam[match['Team Initials']]=1;
            }
        }
    })
    return redCardsPerTeam;
}
module.exports = redCardsPerTeamInAYear;