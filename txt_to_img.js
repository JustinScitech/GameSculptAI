require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("corse");
const {Configuration, OpenAIApi} = require("openai");

const app = express();
const {OPENAI_API_KEY} = process.env;

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  app.use(bodyParser.jason());
  app.use(cors());

  app.listen(8080, () => {
    console.log("server started");
  });
  
  module.exports = app;


  //Add POST endpoint /create for image generation
  app.post("/create", async (req, res) => {
    const { prompt } = req.body;
    try {
      const response = await openai.createImage({
        prompt,
        n: 1,
        size: "256x256",
      });
      res.send(response.data.data[0].url);
    } catch (err) {
      res.send(err.message);
    }
  });