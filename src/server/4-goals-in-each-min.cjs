const { Client } = require("pg");
const clientInfo = require("../clientInfo");
const client = new Client(clientInfo);

const {getEventsAtMinutes, createTable, insertIntoTable, writeOutput} = require('./utility_modules/util_prob_4.cjs');

client.connect();

//GET THE MATCH-ID AND EVENT STRING FROM DATABASE
let events = client.query(`
    SELECT 
        "MatchID", "Event"
    FROM 
        "WorldCupPlayers"
    WHERE 
        "Event" IS NOT NULL
`);

events
  .then((res) => {
    let result = getEventsAtMinutes(res.rows);
    return Promise.resolve(result);
  })
  .then((result) => {
    //CREATE A TABLE NAMED EVENTS WHERE YOUR RESULT WILL GO
    let schema = `"Minute" INTEGER, "Event Type" VARCHAR (3)`;
    let tableName = `"Events"`
    createTable(schema, tableName, client)
      .then(() => {
        //INSERT DATA IN RESULT INTO THE NEW TABLE
        return insertIntoTable(tableName, result, client)
      })
      .then(() => { 
        // RUN QUERY ON NEW TABLE TO GET RESULT
        let query = `
        SELECT 
            "Minute", 
            COUNT("Event Type") 
        FROM 
            "Events" 
        WHERE 
            "Event Type" LIKE 'G' 
        GROUP BY 
            "Minute" 
        ORDER BY 
            "Minute";
        `;
        return client.query(query);
      })
      .then((res) => { 
        // FORMAT THE RESULT IN REQUIRED FORMAT AND WRITE TO A JSON FILE
        let path = "../../public/output/4-goals-in-each-min.json" 
        return writeOutput(res.rows, path);
      })
      .catch((err) => {
        console.error("My Error", err);
      })
      .finally(() => {
        client
          .query(`DROP TABLE "Events"`)
          .then(() => {
            client.end();
          });
      });
  });
