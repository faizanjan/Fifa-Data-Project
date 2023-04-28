
function matchesPerCity (WorldCupMatches){
    if(!Array.isArray(WorldCupMatches)) {
        throw new Error("Invalid Input Type");
    }
    const cityFreq = WorldCupMatches.reduce((acc,match)=>{
        let city = match.City;
        if (city !== '' && typeof(city)==='string') {
            if (acc[city]) acc[city]++;
            else acc[city] = 1;
        }
        return acc;
    },{})
    return cityFreq;
}

module.exports = matchesPerCity;

