let sqlTrigger = require('./utility_modules/util.cjs');

let query = (`
SELECT
  "Referee",
  COUNT("Referee") AS "WorldCups"
FROM
  (
    SELECT DISTINCT
      "Referee",
      "Year"
    FROM
      "WorldCupMatches"
    ORDER BY
      "Year" ASC
  ) AS RefsMapCups
WHERE
  "Referee" IS NOT NULL
GROUP BY
  "Referee"
ORDER BY
  "WorldCups" DESC,
  "Referee" ASC
`);

let outputPath = "../../public/output/3-worldCups-per-ref.json";

sqlTrigger(query,outputPath);
