
function getMatchsForYear (WorldCupMatches,year){
    if(!Array.isArray(WorldCupMatches) || typeof(year)!=='number') {
        throw new Error("Invalid Input Types");
    }
    const idList = WorldCupMatches.reduce((acc,match)=>{
        if(parseInt(match.Year)===year) acc[match.MatchID]=true;
        return acc;
    },{})
    return idList;
}

function redCardsPerTeamInAYear(WorldCupMatches,WorldCupPlayers, year){

    if(!Array.isArray(WorldCupMatches) || !Array.isArray(WorldCupPlayers) || typeof(year)!=='number') {
        throw new Error("Invalid Input Types");
    }

    // Get matchIDs for the specified year
    const matchIdsForAYear = getMatchsForYear(WorldCupMatches, year);

    // Get red cards in the specified year by comparing the matchIDs with above array 
    const redCardsPerTeam = WorldCupPlayers.reduce((acc,match)=>{
        if(matchIdsForAYear[match.MatchID]){
            let event = match.Event;
            if(event===undefined) return acc;
            if(event.includes('R')){
                if(acc[match['Team Initials']]) {
                    acc[match['Team Initials']]++;
                }
                else acc[match['Team Initials']]=1;
            }
        }
        return acc;
    },{})
    
    return redCardsPerTeam;
}
module.exports = {redCardsPerTeamInAYear, getMatchsForYear};