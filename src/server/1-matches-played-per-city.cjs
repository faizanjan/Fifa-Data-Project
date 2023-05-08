let sqlTrigger = require('./utility_modules/util.cjs');

let query = (`
SELECT 
  "City", 
  COUNT("MatchID") 
FROM 
  "WorldCupMatches" 
WHERE 
  "City" IS NOT NULL 
GROUP BY 
  "City" 
ORDER BY 
  "City" ASC;
`);

let outputPath = "../../public/output/1-matches-played-per-city.json";

sqlTrigger(query,outputPath);