const csvToJson = require ('csvtojson');
const fs = require('fs');
const matchesPerCity = require('./server/1-matches-played-per-city.cjs');
const matchesWonPerTeam = require('./server/2-matches-won-per-team.cjs');
const redCardsPerTeamInAYear = require('./server/3-red-cards-per-team-in-2014.cjs');
const top10Players = require('./server/4-top-10-players.cjs');

// Retrieve the CSV data in JSON format for a file in argumented path
async function getDataFromCSV(path){
    let data = await csvToJson().fromFile(path);
    return data;
}

// Problem 1:
(async function prob1(){
    let WorldCupMatches = await getDataFromCSV('src/data/WorldCupMatches.csv');
    const cityFreq = matchesPerCity(WorldCupMatches);
    // console.log(cityFreq);
    fs.writeFileSync('src/public/output/1-matches-played-per-city.json', JSON.stringify(cityFreq));
})();

// Problem 2:
(async function prob2(){
    let WorldCupMatches = await getDataFromCSV('src/data/WorldCupMatches.csv');
    const winnerFreq =matchesWonPerTeam(WorldCupMatches);
    // console.log(winnerFreq);
    fs.writeFileSync('src/public/output/2-matches-won-per-team.json', JSON.stringify(winnerFreq));
})();

// Problem 3:
(async function prob3(){
    let WorldCupMatches = await getDataFromCSV('src/data/WorldCupMatches.csv');
    let WorldCupPlayers = await getDataFromCSV('src/data/WorldCupPlayers.csv');
    const redCardsPerTeam = redCardsPerTeamInAYear(WorldCupMatches,WorldCupPlayers,2014);
    // console.log(redCardsPerTeam);
    fs.writeFileSync('src/public/output/3-red-cards-per-team-in-2014.json', JSON.stringify(redCardsPerTeam));
})();

// Problem 4:
(async function prob4(){
    let WorldCupPlayers = await getDataFromCSV('src/data/WorldCupPlayers.csv');
    const top10 = top10Players(WorldCupPlayers);
    // console.log(top10);
    fs.writeFileSync('src/public/output/4-top-10-players.json', JSON.stringify(top10));
})();

