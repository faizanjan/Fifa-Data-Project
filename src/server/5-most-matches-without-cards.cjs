let runSQLQueryAndStoreResult = require('./utility_modules/util.cjs');

let query = (`
SELECT
  *
FROM
  (
    SELECT
      "Player Name",
      COUNT("MatchID") AS "Matches Played"
    FROM
      "WorldCupPlayers"
    WHERE
      "Event" NOT LIKE '%R%'
      AND "Event" NOT LIKE '%Y%'
    GROUP BY
      "Player Name"
  ) AS withoutcards
  JOIN (
    SELECT
      "Player Name",
      COUNT("MatchID") AS "Matches Played"
    FROM
      "WorldCupPlayers"
    GROUP BY
      "Player Name"
  ) AS withcards ON withoutcards."Player Name"=withcards."Player Name"
WHERE
  withoutcards."Matches Played"=withcards."Matches Played"
ORDER BY
  withoutcards."Matches Played" DESC,
  withoutcards."Player Name" ASC
LIMIT
  10;
`);

let outputPath = "../../public/output/5-most-matches-without-cards.json";

runSQLQueryAndStoreResult(query,outputPath);
