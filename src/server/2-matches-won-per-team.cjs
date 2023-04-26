function matchesWonPerTeam (WorldCupMatches){
    const winnerFreq = {};
    WorldCupMatches.map(match => {
        let winner ='';
        if(match['Home Team Goals']>match['Away Team Goals']) {
            winner = match['Home Team Name']
        }
        else if(match['Home Team Goals']<match['Away Team Goals'])winner = match['Away Team Name']

        let freqKeys = Object.keys(winnerFreq);
        if(freqKeys.includes(winner)) winnerFreq[winner]++;
        else if (winner!=='') winnerFreq[winner]=1;
    })
    return winnerFreq;
}

module.exports = matchesWonPerTeam;