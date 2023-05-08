let sqlTrigger = require('./util.cjs');

let query= (`
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

let outputPath = "../public/output/6-top-8-in-germany.json";

sqlTrigger(query,outputPath);
