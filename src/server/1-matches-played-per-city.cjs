
function matchesPerCity (WorldCupMatches){
    const cityFreq = WorldCupMatches.reduce((acc,match)=>{
        let city = match.City;
        if (city !== '') {
            let freqKeys = Object.keys(acc);
            if (freqKeys.includes(city)) acc[city]++;
            else acc[city] = 1;
        }
        return acc;
    },{})
    return cityFreq;
}

module.exports = matchesPerCity;

