
function getMatchsForYear (WorldCupMatches,year){
    const idList = [];
    WorldCupMatches.map(match=>{
        if(parseInt(match.Year)===year) idList.push(match.MatchID)
    })
    return idList;
}

function redCardsPerTeamInAYear(WorldCupMatches,WorldCupPlayers, year){
    const matchIdsForAYear = getMatchsForYear(WorldCupMatches, year);
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