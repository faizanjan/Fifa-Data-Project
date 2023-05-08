const { Client } = require("pg");
const fs = require("fs").promises;
const clientInfo = require("../clientInfo");
const path = require("path");

let client = new Client(clientInfo);

client.connect();

let eachTeamWins = client.query(`
SELECT
  Team,
  COUNT(Team) AS Wins
FROM
  (
    SELECT
      "Home Team Name" AS Team
    FROM
      "WorldCupMatches"
    WHERE
      "Home Team Goals">"Away Team Goals"
    UNION ALL
    SELECT
      "Away Team Name" AS Team
    FROM
      "WorldCupMatches"
    WHERE
      "Home Team Goals"<"Away Team Goals"
  ) AS Combined
GROUP BY
  Team
ORDER BY
  Wins DESC;
`);

eachTeamWins
  .then((res) => {
    console.log(res.rows);
    return fs.writeFile(
      path.join(__dirname, "../public/output/2-matches-won-per-team.json"),
      JSON.stringify(res.rows)
    );
  })
  .then(() => {
    console.log("Matches won per team written in 2-matches-won-per-team.json");
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    client.end();
  });
