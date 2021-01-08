import express from "express";
import serverless from "serverless-http";
import axios from "axios";

const app = express();
const router = express.Router();

router.get("/randomWiki", (_, res) => {
  axios({
    method: "GET",
    responseType: "text",
    url: "https://cs.wikipedia.org/wiki/Speci%C3%A1ln%C3%AD:N%C3%A1hodn%C3%A1_str%C3%A1nka"
  })
    .then(({ data: rawHtml }) => res.send(rawHtml))
    .catch(err => res.send(`<p>${err.message}</p>`));
});

app.use("/.netlify/functions/proxy", router);

export const handler = serverless(app);
