var express = require("express");
const fs = require("fs");

var app = express();

// https://stackoverflow.com/questions/46846621/cant-allow-cross-origin-request-in-local-nodejs-server
var cors = require("cors");
app.options("*", cors()); // include before other routes
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.listen(9000, () => {
  console.log("Server running on port 9000");
});

app.get("/load", (req, res, next) => {
  let rawdata = fs.readFileSync("data.json");
  res.json(JSON.parse(rawdata));
});

app.post("/save", (req, res, next) => {
  console.log(req.body);
  let data = JSON.stringify(req.body);
  fs.writeFileSync("data.json", data);
  res.json({ status: 200 });
});
