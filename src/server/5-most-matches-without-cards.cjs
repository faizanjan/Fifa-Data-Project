const { Client } = require('pg');
const fs = require('fs').promises;
const clientInfo = require('../clientInfo');
const path = require('path');
const client = new Client(clientInfo);

client.connect();

let events = client.query(`
    SELECT "Player Name", COUNT("MatchID") AS "Matches Played"
    FROM "WorldCupPlayers"
    WHERE "Event" NOT LIKE '%R%' AND "Event" NOT LIKE '%Y%'
    GROUP BY "Player Name"
    ORDER BY "Matches Played" DESC,
             "Player Name" ASC
    LIMIT 10
`)

events
    .then((res) => {
        return fs.writeFile(path.join(__dirname, '../public/output/5-most-matches-without-cards.json'), JSON.stringify(res.rows));
    })
    .catch(err => console.error(err))
    .finally(() => { client.end() })


