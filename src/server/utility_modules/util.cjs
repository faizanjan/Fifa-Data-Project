const fs = require("fs").promises;
const path = require("path");
const { Client } = require("pg");
const clientInfo = require("../../clientInfo");
const client = new Client(clientInfo);

module.exports = function runSQLQueryAndStoreResult (query, outputPath){
  client.connect();
  client
    .query(query)
    .then((res) => {
      return fs.writeFile(
        path.join(__dirname, outputPath),
        JSON.stringify(res.rows)
      );
    })
    .catch((err) => console.error(err))
    .finally(() => {
      client.end();
    });
};
