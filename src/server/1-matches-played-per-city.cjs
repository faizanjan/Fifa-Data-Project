const {Client} = require('pg');
const fs = require('fs').promises;
const clientInfo = require('../clientInfo');
const path = require('path');

let client = new Client(clientInfo);

client.connect();

let worldCups = client.query(`
SELECT "City", COUNT("MatchID") 
FROM "WorldCupMatches"
WHERE "City" IS NOT NULL
GROUP BY "City"
ORDER BY "City" ASC;
`)

worldCups
    .then(res=>{
        console.log(res.rows);
        return fs.writeFile(path.join(__dirname, '../public/output/1-matches-played-per-city.json'), JSON.stringify(res.rows));
    })
    .then(()=>{console.log("Matches per city written in 1-matches-played-per-city.json")})
    .catch(err=>{console.error(err.msg)})
    .finally(()=>{client.end()});