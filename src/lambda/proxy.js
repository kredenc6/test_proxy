const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");

const app = express();
const router = express.Router();
router.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get("/randomWiki", (_, res) => {
  console.log("rediretc runs");
  axios({
    method: "GET",
    responseType: "text",
    url: "https://cs.wikipedia.org/wiki/Speci%C3%A1ln%C3%AD:N%C3%A1hodn%C3%A1_str%C3%A1nka"
  })
    .then(({ data: rawHtml }) => res.send(rawHtml))
    .catch(err => res.send(`<p>${err.message}</p>`));
});

app.use("/.netlify/functions/proxy", router);

module.exports.handler = serverless(app);
