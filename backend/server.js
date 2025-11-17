// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(cors());

// app.get('/hello', (req, res) => {
//   res.json({ message: "Hello from Node.js backend!" });
// });

// app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));


// backend/server.js
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/api/gemini', async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'Missing question.' });

  const prompt = `You are an AI assistant for civic engagement. Answer in less than 200 words: ${question}`;
  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: prompt }] }
          ]
        }),
      }
    );
    const geminiJson = await geminiRes.json();
    res.json(geminiJson);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'AI backend request failed.' });
  }
});

// CORS for local/mobile dev
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`AI backend running on port ${PORT}`));
