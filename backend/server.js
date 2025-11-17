// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(cors());

// app.get('/hello', (req, res) => {
//   res.json({ message: "Hello from Node.js backend!" });
// });

// app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));


// backend/server.js


// const express = require('express');
// const fetch = require('node-fetch');
// require('dotenv').config();

// const app = express();
// app.use(express.json());

// app.post('/api/gemini', async (req, res) => {
//   const { question } = req.body;
//   if (!question) return res.status(400).json({ error: 'Missing question.' });

//   const prompt = `You are an AI assistant for civic engagement. Answer in less than 200 words: ${question}`;
//   try {
//     const geminiRes = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           contents: [
//             { parts: [{ text: prompt }] }
//           ]
//         }),
//       }
//     );
//     const geminiJson = await geminiRes.json();
//     res.json(geminiJson);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'AI backend request failed.' });
//   }
// });

// // CORS for local/mobile dev
// const cors = require('cors');
// app.use(cors());

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`AI backend running on port ${PORT}`));


// DIVIDER //

// console.log('Starting server.js');

// const express = require('express');
// const fetch = require('node-fetch');
// require('dotenv').config();
// const cors = require('cors');

// console.log('dotenv loaded:', { parsed: process.env });

// const app = express();
// const PORT = process.env.PORT || 5000;

// console.log('PORT:', PORT);
// console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Loaded' : 'MISSING');

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Test root route
// app.get('/', (req, res) => res.send('It works!'));

// // Gemini API proxy route with enhanced logging and error handling
// app.post('/api/gemini', async (req, res) => {
//   const { question } = req.body;
//   if (!question) return res.status(400).json({ error: 'Missing question.' });

//   const prompt = `You are an AI assistant for civic engagement. Answer in less than 200 words: ${question}`;

//   try {
//     const geminiRes = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${process.env.GEMINI_API_KEY}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
//       }
//     );

//     console.log('Gemini status:', geminiRes.status);
//     const bodyText = await geminiRes.text();
//     console.log('Gemini response body:', bodyText);

//     try {
//       const json = JSON.parse(bodyText);
//       if (geminiRes.ok) {
//         res.json(json);
//       } else {
//         res.status(geminiRes.status).json({ error: json.error?.message || 'Unknown Gemini API error' });
//       }
//     } catch (parseErr) {
//       console.error('JSON parse error:', parseErr);
//       res.status(500).json({ error: 'Invalid JSON response from Gemini API' });
//     }
//   } catch (err) {
//     console.error('Fetch Gemini error:', err);
//     res.status(500).json({ error: 'AI backend request failed.' });
//   }
// });


// app.listen(PORT, () => {
//   console.log(`AI backend running on port ${PORT}`);
// });


// DIVIDER //


// console.log('Starting server.js');

// const express = require('express');
// const { GoogleGenerativeAI } = require('@google/generative-ai'); // Use the new SDK
// require('dotenv').config();
// const cors = require('cors');

// console.log('dotenv loaded');

// // --- SDK Setup ---
// const apiKey = process.env.GEMINI_API_KEY;
// if (!apiKey) {
//   // This will stop the server if the key is missing, a much better error!
//   console.error('FATAL ERROR: GEMINI_API_KEY is MISSING from .env file');
//   process.exit(1); 
// }

// const genAI = new GoogleGenerativeAI(apiKey);
// // const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
// const modelName = "gemini-1.5-flash-latest"; // <-- The new model to try
// const model = genAI.getGenerativeModel({ model: modelName });
// // ---------------

// const app = express();
// const PORT = process.env.PORT || 5000;

// console.log('PORT:', PORT);
// console.log('GEMINI_API_KEY: Loaded');

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Test root route
// app.get('/', (req, res) => res.send('It works!'));

// // --- New Gemini Route using the SDK ---
// app.post('/api/gemini', async (req, res) => {
//   const { question } = req.body;
//   if (!question) {
//     return res.status(400).json({ error: 'Missing question.' });
//   }

//   const prompt = `You are an AI assistant for civic engagement. Answer in less than 200 words: ${question}`;

//   try {
//     // Generate content using the SDK
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
    
//     // IMPORTANT: Send the response back in the *exact* format
//     // your app (AIChatScreen.tsx) is expecting.
//     res.json({
//       candidates: [
//         {
//           content: {
//             parts: [
//               { text: text }
//             ]
//           }
//         }
//       ]
//     });

//   } catch (err) {
//     // The SDK will give us much clearer errors
//     console.error('GOOGLE AI SDK ERROR:', err);
//     res.status(500).json({ error: 'AI backend request failed.' });
//   }
// });


// app.listen(PORT, () => {
//   console.log(`AI backend running on port ${PORT}`);
//   console.log(`Using Gemini model: ${modelName}`);
// });


// DIVIDER //

console.log('Starting server.js');

const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Use the SDK
require('dotenv').config();
const cors = require('cors');

console.log('dotenv loaded');

// --- SDK Setup ---
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('FATAL ERROR: GEMINI_API_KEY is MISSING from .env file');
  process.exit(1); 
}

const genAI = new GoogleGenerativeAI(apiKey);

// --- THIS IS THE LINE TO CHANGE ---
// We are using a name directly from your successful log!
const modelName = "gemini-pro-latest"; 
const model = genAI.getGenerativeModel({ model: modelName });
// ---------------

const app = express();
const PORT = process.env.PORT || 5000;

console.log('PORT:', PORT);
console.log('GEMINI_API_KEY: Loaded');

// Middleware
app.use(express.json());
app.use(cors());

// Test root route
app.get('/', (req, res) => res.send('It works!'));

// --- New Gemini Route using the SDK ---
app.post('/api/gemini', async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Missing question.' });
  }

  const prompt = `You are an AI assistant for civic engagement. Answer in less than 200 words: ${question}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Send the response in the format your app expects
    res.json({
      candidates: [
        {
          content: {
            parts: [
              { text: text }
            ]
          }
        }
      ]
    });

  } catch (err) {
    console.error('GOOGLE AI SDK ERROR:', err);
    res.status(500).json({ error: 'AI backend request failed.' });
  }
});


app.listen(PORT, () => {
  console.log(`AI backend running on port ${PORT}`);
  console.log(`Using Gemini model: ${modelName}`); // This will confirm our change
});