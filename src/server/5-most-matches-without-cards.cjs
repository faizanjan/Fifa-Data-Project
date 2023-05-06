const { Client } = require('pg');
const fs = require('fs').promises;
const clientInfo = require('../clientInfo');
const path = require('path');
const client = new Client(clientInfo);

client.connect();

let events = client.query(`
SELECT *
    FROM 
        (SELECT "Player Name", COUNT("MatchID") AS "Matches Played"
        FROM "WorldCupPlayers"
        WHERE "Event" NOT LIKE '%R%' AND "Event" NOT LIKE '%Y%'
        GROUP BY "Player Name") 
        AS withoutcards
    JOIN
        (SELECT "Player Name", COUNT("MatchID") AS "Matches Played"
        FROM "WorldCupPlayers"
        GROUP BY "Player Name") 
        AS withcards
    ON withoutcards."Player Name" = withcards."Player Name"
    WHERE withoutcards."Matches Played" = withcards."Matches Played"
    ORDER BY withoutcards."Matches Played" DESC,
             withoutcards."Player Name" ASC
    LIMIT 10;
        `)
events
    .then((res) => {
        return fs.writeFile(path.join(__dirname, '../public/output/5-most-matches-without-cards.json'), JSON.stringify(res.rows));
    })
    .catch(err => console.error(err))
    .finally(() => { client.end() })


