
function getMatchsForYear (WorldCupMatches,year){
    const idList = WorldCupMatches.reduce((acc,match)=>{
        if(parseInt(match.Year)===year) acc.push(match.MatchID)
        return acc;
    },[])
    return idList;
}

function redCardsPerTeamInAYear(WorldCupMatches,WorldCupPlayers, year){

    // Get matchIDs for the specified year
    const matchIdsForAYear = getMatchsForYear(WorldCupMatches, year);

    // Get red cards in the specified year by comparing the matchIDs with above array 
    const redCardsPerTeam = WorldCupPlayers.reduce((acc,match)=>{
        if(matchIdsForAYear.includes(match.MatchID)){
            let event = match.Event;
            if(event.includes('R')){
                let freqKeys = Object.keys(acc);
                if(freqKeys.includes(match['Team Initials'])) {
                    acc[match['Team Initials']]++;
                }
                else acc[match['Team Initials']]=1;
            }
        }
        return acc;
    },{})
    
    return redCardsPerTeam;
}
module.exports = redCardsPerTeamInAYear;