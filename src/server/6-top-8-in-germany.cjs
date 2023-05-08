const { Client } = require("pg");
const fs = require("fs").promises;
const clientInfo = require("../clientInfo");
const path = require("path");
const client = new Client(clientInfo);

client.connect();

let result = client.query(`
SELECT
  "Team Name",
  SUM("Goals") AS "Goals"
FROM
  (
    SELECT
      "Home Team Name" AS "Team Name",
      "Home Team Goals" AS "Goals",
      "Year"
    FROM
      "WorldCupMatches"
    UNION ALL
    SELECT
      "Away Team Name" AS "Team Name",
      "Away Team Goals" AS "Goals",
      "Year"
    FROM
      "WorldCupMatches"
  ) AS sub
WHERE
  "Year" IN (
    SELECT
      "Year"
    FROM
      "WorldCups"
    WHERE
      "Country"='Germany'
  )
GROUP BY
  "Team Name"
ORDER BY
  "Goals" DESC
LIMIT
  8;
`);

result
  .then((res) => {
    // console.log(res.rows);
    return fs.writeFile(
      path.join(__dirname, "../public/output/6-top-8-in-germany.json"),
      JSON.stringify(res.rows)
    );
  })
  .catch((err) => console.error(err))
  .finally(() => {
    client.end();
  });
