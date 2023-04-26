
function matchesPerCity (WorldCupMatches){
    console.log(WorldCupMatches)
    const cityFreq = {};
    WorldCupMatches.map(match => {
        let city = match.City;
        if (city !== '') {
            let freqKeys = Object.keys(cityFreq);
            if (freqKeys.includes(city)) cityFreq[city]++;
            else cityFreq[city] = 1;
        }
    })
    return cityFreq;
}

module.exports = matchesPerCity;

