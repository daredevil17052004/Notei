const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const { GoogleGenerativeAI } = require("@google/generative-ai");
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

// MongoDB connection
// const mongoUri = ;                   **********************
if (!mongoUri) {
  logger("MONGO_URI is not set");
  process.exit(1);
}

const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

// const apiKey = ;                   **********************
if (!apiKey) {
  logger("API_KEY is not set");
  process.exit(1);
}

let meetingData = null;

const fetchMeetingData = async () => {
  try {
    await client.connect();
    const database = client.db('meeting');
    const collection = database.collection('notes');
    meetingData = await collection.findOne({}); // Adjust the query as needed
    logger("Meeting data fetched successfully", meetingData);
  } catch (error) {
    logger(`Error fetching meeting data: ${error.message}`);
  } finally {
    await client.close();
  }
};

// Fetch meeting data once when the server starts
fetchMeetingData();

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

  if (!meetingData) {
    logger("Meeting data is not available");
    return res.status(500).send({ error: "Meeting data is not available" });
  }

  try {
    const finalprompt = `Meeting conversation data: \n${meetingData.conversation}\nMeeting URL: ${meetingData.url}\nEnd of meeting conversation.\n\nUser's queries about meeting: ${prompt}`;

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