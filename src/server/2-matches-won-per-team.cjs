const csvToJson = require ('csvtojson');
const fs = require('fs');

const winnerFreq ={};

// THE FOLLOWING COMMENTED CODE IS FOR COUNTING NUMBER OF WORLD-CUPS WON BY EACH TEAM
// csvToJson()
//     .fromFile('src/data/WorldCups.csv')
//     .then(data=>{
//         data.map(match=>{
//             let winner = match.Winner;
//             if(winner!==''){
                // let freqKeys = Object.keys(winnerFreq);
                // if(freqKeys.includes(winner)) winnerFreq[winner]++;
                // else winnerFreq[winner]=1;
//             }
//         })
//         // console.log(winnerFreq);
        // fs.writeFileSync('src/public/output/2-matches-won-per-team.json', JSON.stringify(winnerFreq));
//     });

csvToJson()
    .fromFile('src/data/WorldCupMatches.csv')
    .then(data=>{
        data.map(match=>{
            let winner ='';
            if(match['Home Team Goals']>match['Away Team Goals']) {
                winner = match['Home Team Name']
            }
            else if(match['Home Team Goals']<match['Away Team Goals'])winner = match['Away Team Name']

            let freqKeys = Object.keys(winnerFreq);
            if(freqKeys.includes(winner)) winnerFreq[winner]++;
            else if (winner!=='') winnerFreq[winner]=1;
        })
        fs.writeFileSync('src/public/output/2-matches-won-per-team.json', JSON.stringify(winnerFreq));

    })
