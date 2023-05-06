const { Client } = require('pg');
const fs = require('fs').promises;
const clientInfo = require('../clientInfo');
const path = require('path');
const client = new Client(clientInfo);

client.connect();

let events = client.query(`
    SELECT "MatchID", "Event"
    FROM "WorldCupPlayers"
    WHERE "Event" IS NOT NULL
`)


events
    .then((res) => {
        let data = (res.rows);
        let newData = data.map()
    })
    .catch(err => console.error(err))
    .finally(() => { client.end() })


let result = client.query(`
    CREATE TABLE "Events" (
        "MatchID" INTEGER, "Minute" INTEGER, "Type of Event"
    )
`)

// return fs.writeFile(path.join(__dirname, '../public/output/4-goals-in-each-min.json'), JSON.stringify(res.rows));