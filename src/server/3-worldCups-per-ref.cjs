const {Client} = require('pg');
const fs = require('fs').promises;
const clientInfo= require('../clientInfo');
const path = require('path');
const client = new Client(clientInfo);

client.connect();

let result = client.query(`
    SELECT "Referee", COUNT("Referee") AS "WorldCups"
    FROM (
        SELECT DISTINCT "Referee", "Year" FROM "WorldCupMatches"
        ORDER BY "Year" ASC
    ) AS RefsMapCups
    WHERE "Referee" IS NOT NULL
    GROUP BY "Referee"
    ORDER BY "WorldCups" DESC,
             "Referee" ASC
`)

result 
    .then((res)=>{
        console.log(res.rows);
        return fs.writeFile(path.join(__dirname, '../public/output/3-worldCups-per-ref.json'), JSON.stringify(res.rows));
    })
    .catch(err=>console.error(err))
    .finally(()=>{client.end()})