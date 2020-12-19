const express = require("express");
const csvtojson = require("csvtojson");
const cors = require("cors");
const fs = require("fs");
const app = express();
const csvFilePath = "./Data.csv";
const dataJson = require("./Data.json");
app.use(cors());

csvtojson()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    fs.writeFileSync("Data.json", JSON.stringify(jsonObj), "utf-8", (err) => {
      if (err) console.log(err);
    });
  });

app.get("/api/data", (req, res) => {
  res.send(dataJson);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on Port ${port}`));
