const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai")
const app = express();
const port = process.env.PORT || 5555;

// Custom logger function
const logger = (message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
};

// Middleware
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

// const apiKey = 'AIzaSyCYVzxjMCXmoJLddnCqphWgr27k2Md7i34';
const apiKey = process.env.API_KEY;
if (!apiKey) {
  logger("API_KEY is not set");
  process.exit(1);
}

app.post("/api/transcript", async (req, res) => {
  logger("Received request for /api/transcript");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  logger(req.body);
  const { prompt } = req.body;

  if (!prompt) {
    logger("Prompt is missing in the request body");
    return res.status(400).send({ error: "Prompt is required" });
  }

  const meetingData = fs.existsSync("meetdata.txt") ? fs.readFileSync("meetdata.txt", "utf-8") : "";
  const finalprompt = `Meeting conversation data \n ${meetingData}\n end of meet conversation \n\n User's queries about meeting: ${prompt}`;

  try {
    logger("Generating content with the model");
    const result = await model.generateContent([finalprompt]);
    logger("Content generated successfully");
    res.send({ response: result.response.text() });
  } catch (error) {
    logger(`Error generating content: ${error.message}`);
    res.status(500).send({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  logger(`Server is running on http://localhost:${port}`);
});