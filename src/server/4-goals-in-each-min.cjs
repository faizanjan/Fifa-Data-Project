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
                return insertData(result, client);
            })
            .then((msg) => {
                console.log(msg);
                return client.query(`SELECT * FROM "Events"`)
            })
            .catch((err) => {
                console.error("My Error", err)
            })
            .finally(() => {
                console.log("Ending The Connection");
                client.end();
            })

    })

// Function to insert data into the table
function insertData(array, client) {
    return new Promise((resolve, reject) => {
        const myPromises = [];
        // Iterate over the array and generate the INSERT statements
        array.forEach(obj => {
            const minute = parseInt(obj.Minute);
            const eventType = obj['Event Type'];

            const insertSql = `INSERT INTO "Events" ("Minute", "Event Type") VALUES (${minute}, '${eventType}')`;

            // Execute the INSERT statement
            myPromises.push(client.query(insertSql)); 
        });
        Promise.all(myPromises)
            .then(()=>{
                resolve("Data Inserted Succesfully")
            })
            .catch(err=>{reject(err)})
    })
}