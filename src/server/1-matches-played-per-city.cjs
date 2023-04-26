const csvToJson = require ('csvtojson');
const fs = require('fs');

const cityFreq ={};
csvToJson()
    .fromFile('src/data/WorldCupMatches.csv')
    .then(data=>{
        data.map(match=>{
            let city = match.City;
            if(city!==''){
                let freqKeys = Object.keys(cityFreq);
                if(freqKeys.includes(city)) cityFreq[city]++;
                else cityFreq[city]=1;
            }
        })
        fs.writeFileSync('src/public/output/1-matches-played-per-city.json', JSON.stringify(cityFreq));
    });

