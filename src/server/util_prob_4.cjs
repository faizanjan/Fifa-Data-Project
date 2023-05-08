const fs = require("fs").promises;
const path = require("path");

function getEventsAtMinutes(events) {
  let eventArr = events.map((el) => el["Event"].split(" "));
  let combinedEvents = eventArr.flat();
  let result = combinedEvents.map((el) => {
    let min = el.match(/\d+/)[0];
    return {
      Minute: min,
      "Event Type": el.substring(0, el.indexOf(min)),
    };
  });
  return result;
}

function createTable(schema, tableName, client) {
  return client.query(
    `
          CREATE TABLE IF NOT EXISTS ${tableName} (${schema});
      `
  );
}

function insertIntoTable(table, data, client) {
  const values = data.map((obj) => `('${obj.Minute}', '${obj["Event Type"]}')`);
  values.join(",");
  return client.query(`
                  INSERT INTO 
                    ${table} ("Minute", "Event Type")
                  VALUES ${values};
              `);
}

function writeOutput(data, path) {
  let output = data.reduce((acc, item) => {
    acc[item.Minute] = Number(item["count"]);
    return acc;
  }, {});
  return fs.writeFile(
    path.join(__dirname, path),
    JSON.stringify(output)
  );
}

module.exports = {
  getEventsAtMinutes,
  createTable,
  insertIntoTable,
  writeOutput,
};
