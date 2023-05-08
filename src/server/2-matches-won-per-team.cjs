let runSQLQueryAndStoreResult = require('./utility_modules/util.cjs');

let query = (`
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

let outputPath = "../../public/output/2-matches-won-per-team.json";

runSQLQueryAndStoreResult(query,outputPath);
