import OpenAI from 'openai'; 
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/post', async (req, res) => {
  const openai = new OpenAI({
    apiKey: "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"
  });

  const chatHistory = []; 
  var backgroundText = "";
  var storyText = "";

  var name = req.body.characterName; 
  var species = req.body.species;
  var gender = req.body.gender;
  var description = req.body.characterDescription;
  var theme = req.body.themes;
  var location = req.body.location;
  var backgroundPrompt = `Give me a one paragraph backstory for a ${gender} ${species} named ${name} who lives in ${location} and is ${description}`;
  var storyPrompt = `Write me a short story about ${name} with the theme of ${theme} in ${location}`;

  const messageList = chatHistory.map(([input_text, completion_text]) => ({
    role: "user" === input_text ? "ChatGPT" : "user",
    content: input_text,
  }));
  messageList.push({ role: "user", content: backgroundPrompt });

  try {
    const GPTOutput = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messageList,
    });

    const output_text = GPTOutput.choices[0].message.content;
    var backgroundText = output_text;

    chatHistory.push([backgroundPrompt, output_text]);
  } catch (err) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }
  }

  messageList.push({ role: "user", content: storyPrompt });

  try {
    const GPTOutput = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messageList,
    });

    const output_text = GPTOutput.choices[0].message.content;
    storyText = output_text;

    chatHistory.push([storyPrompt, output_text]);
  } catch (err) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }
  }

  var information = {
    background: backgroundText,
    story: storyText,
  };

  console.log(information)
  res.send(information);
});



// Start the server on the specified port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
