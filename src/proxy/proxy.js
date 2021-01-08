const express = require("express");
const serverless = require("serverless-http");

const app = express();

const router = express.Router();

router.get("/randomWiki", (req, res) => {
  fetch("https://cs.wikipedia.org/wiki/Speci%C3%A1ln%C3%AD:N%C3%A1hodn%C3%A1_str%C3%A1nka")
    .then(response => response.text())
    .then(rawHtml => res(rawHtml))
    .catch(err => res(`<p>${err.message}</p>`))
});

module.exports.handler = serverless(app);