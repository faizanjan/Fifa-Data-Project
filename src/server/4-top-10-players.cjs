function top10Players(WorldCupPlayers) {
    let top10 = WorldCupPlayers.reduce((acc, match) => {
        let event = match.Event;
        if (event.includes('G')) {
            let goals = 0;
            for (let index = event.indexOf('G'); index < event.length; index++) {
                if (index === 0 || (event.charAt(index) === 'G' && event.charAt(index - 1) !== 'O')) goals++;
            }
            if (acc[match['Player Name']]) {
                acc[match['Player Name']] += goals;
            }
            else acc[match['Player Name']] = goals;
        }
        return acc;
    }, {})

    let top10Arr = Object.entries(top10);
    top10Arr.sort((a, b) => b[1] - a[1]).splice(10);
    top10 = Object.fromEntries(top10Arr);
    return top10;
}
module.exports = top10Players;
