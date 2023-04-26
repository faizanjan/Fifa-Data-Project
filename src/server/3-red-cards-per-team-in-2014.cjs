const csvToJson = require ('csvtojson');
const fs = require('fs');


const matchIds2014 = [];
csvToJson()
    .fromFile('src/data/WorldCupMatches.csv')
    .then(data=>{
        data.map(match=>{
            if(match.Year==='2014') matchIds2014.push(match.MatchID)
        })
    })


const redCardsPerTeam ={};
csvToJson()
    .fromFile('src/data/WorldCupPlayers.csv')
    .then(data=>{
        data.map(match=>{
            if(matchIds2014.includes(match.MatchID)){
                let event = match.Event;
                if(event.includes('R')){
                    let si= event.indexOf('R');
                    if(event.charAt(si+1)==='S') si+=2;
                    let ei = event.substring(si).indexOf("'");
                    let numOfR = event.substring(si+1, ei+si);
    
    
                    let freqKeys = Object.keys(redCardsPerTeam);
                    if(freqKeys.includes(match['Team Initials'])) {
                        redCardsPerTeam[match['Team Initials']]+= parseInt(numOfR);
                    }
                    else redCardsPerTeam[match['Team Initials']]=parseInt(numOfR);
                }
            }
        })
        fs.writeFileSync('src/public/output/3-red-cards-per-team-in-2014.json', JSON.stringify(redCardsPerTeam));
    });

