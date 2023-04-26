const csvToJson = require ('csvtojson');
const fs = require('fs');

const winnerFreq ={};
csvToJson()
    .fromFile('src/data/WorldCups.csv')
    .then(data=>{
        data.map(match=>{
            let winner = match.Winner;
            if(winner!==''){
                let freqKeys = Object.keys(winnerFreq);
                if(freqKeys.includes(winner)) winnerFreq[winner]++;
                else winnerFreq[winner]=1;
            }
        })
        // console.log(winnerFreq);
        fs.writeFileSync('src/public/output/2-matches-won-per-team.json', JSON.stringify(winnerFreq));
    });

