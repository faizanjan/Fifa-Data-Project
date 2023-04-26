// const csvToJson = require ('csvtojson');
// const fs = require('fs');


// const matchIds2014 = [];
// csvToJson()
//     .fromFile('src/data/WorldCupMatches.csv')
//     .then(data=>{
//         data.map(match=>{
//             if(match.Year==='2014') matchIds2014.push(match.MatchID)
//         })
//     })


// const redCardsPerTeam ={};
// csvToJson()
//     .fromFile('src/data/WorldCupPlayers.csv')
//     .then(data=>{
//         data.map(match=>{
//             if(matchIds2014.includes(match.MatchID)){
//                 let event = match.Event;
//                 if(event.includes('R')){
//                     let freqKeys = Object.keys(redCardsPerTeam);
//                     if(freqKeys.includes(match['Team Initials'])) {
//                         redCardsPerTeam[match['Team Initials']]++;
//                     }
//                     else redCardsPerTeam[match['Team Initials']]=1;
//                 }
//             }
//         })
//         fs.writeFileSync('src/public/output/3-red-cards-per-team-in-2014.json', JSON.stringify(redCardsPerTeam));
//     });

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