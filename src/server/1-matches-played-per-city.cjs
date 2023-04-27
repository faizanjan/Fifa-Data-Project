
function matchesPerCity (WorldCupMatches){
    const cityFreq = WorldCupMatches.reduce((acc,match)=>{
        let city = match.City;
        if (city !== '') {
            if (acc[city]) acc[city]++;
            else acc[city] = 1;
        }
        return acc;
    },{})
    return cityFreq;
}

module.exports = matchesPerCity;

