function top10Players(WorldCupPlayers) {
    let top10 = {};
    WorldCupPlayers.map(match => {
        let event = match.Event;
        if (event.includes('G')) {
            let index = event.indexOf('G');
            if (event.charAt(index - 1) !== 'O') {
                let freqKeys = Object.keys(top10);
                if (freqKeys.includes(match['Player Name'])) {
                    top10[match['Player Name']]++;
                }
                else top10[match['Player Name']] = 1;
            }
        }
    })
    let top10Arr = Object.entries(top10);
    top10Arr.sort((a, b) => b[1] - a[1]).splice(10);
    top10 = Object.fromEntries(top10Arr);
    return top10;
}
module.exports = top10Players;
