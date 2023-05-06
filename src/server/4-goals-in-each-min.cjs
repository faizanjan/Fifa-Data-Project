const { Client } = require('pg');
const fs = require('fs').promises;
const clientInfo = require('../clientInfo');
const path = require('path');
const { Console } = require('console');
const client = new Client(clientInfo);

client.connect();

//GET THE MATCH-ID AND EVENT STRING FROM DATABASE
let events = client.query(`
    SELECT "MatchID", "Event"
    FROM "WorldCupPlayers"
    WHERE "Event" IS NOT NULL
`)


events
    .then((res) => {
        // EXTRACT ALL THE INDIVIDUAL EVENTS AND THEIR MINUTES IN AN ARRAY
        let events = (res.rows);
        let eventArr = events.map(el => el["Event"].split(' '))
        let combinedEvents = eventArr.flat();
        // USE THAT ARRAY TO MAKE AN ARRAY OF OBJECTS WHERE MINUTES MAP TO EVENTS
        let result = combinedEvents.map(el => {
            let min = el.match(/\d+/)[0];
            return {
                "Minute": min,
                "Event Type": el.substring(0, el.indexOf(min))
            }
        })
        return Promise.resolve(result);
    })
    .then((result) => {
        //CREATE A TABLE NAMED EVENTS WHERE YOUR RESULT WILL GO
        let schema = `"Minute" INTEGER, "Event Type" VARCHAR (3)`
        client.query(`
            CREATE TABLE IF NOT EXISTS "Events" (${schema});
        `)
            .then(() => {
                console.log("Table Create");
                const values = result.map(obj => `('${obj.Minute}', '${obj['Event Type']}')`);
                values.join(',');
                console.log(values);
                return client.query(`
                    INSERT INTO "Events" ("Minute", "Event Type")
                    VALUES ${values};
                `);
            })
            .then(() => {
                console.log("msg");
                return client.query(`SELECT "Minute", COUNT("Event Type")
                                    FROM "Events"
                                    WHERE "Event Type" LIKE 'G' 
                                    GROUP BY "Minute"
                                    ORDER BY "Minute";
                                    `)
            })
            .then((res)=>{
                console.log("Ending The Connection");
                let output= res.rows.reduce((acc, item)=> {
                    acc[item.Minute] = Number(item['count']);
                    return acc;
            }, {});
                return fs.writeFile(path.join(__dirname, '../public/output/4-goals-in-each-min.json'), JSON.stringify(output));
            })
            .catch((err) => {
                console.error("My Error", err)
            })
            .finally(() => {
                client.query(`
                    DROP TABLE "Events"
                `)
                .then(()=>{
                    client.end();
                })
            })
    })