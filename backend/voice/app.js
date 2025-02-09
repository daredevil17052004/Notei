const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');


const app = express();
const port = 5555;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error('API_KEY is not set');
  process.exit(1);
}

app.post('/api/transcript', async (req, res) => {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const { prompt } = req.body;
    
    if (!prompt) {
        return res.status(400).send({ error: 'Prompt is required' });
    }
    const meetingData = fs.existsSync('meetdata.txt') ? fs.readFileSync('meetdata.txt', 'utf-8') : '';

    const finalprompt = `Meeting conversation data \n ${meetingData}\n end of meet conversation \n\n User's queries about meeting: ${prompt} \n Please write short, clear and conscise answers without using any symbols and avoid markdown`;
    
    try {
        const result = await model.generateContent([finalprompt]);
        res.send({ response: result.response.text() });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});