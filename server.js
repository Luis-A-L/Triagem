const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Gemini API endpoint
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'API Proxy is running' });
});

// Proxy endpoint for Gemini API
app.post('/api/gemini', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        if (!GEMINI_API_KEY) {
            return res.status(500).json({ error: 'API key not configured on server' });
        }

        // Call Gemini API
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.2,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 65536,
                }
            })
        });

        if (!response.ok) {
            const error = await response.json();
            return res.status(response.status).json({
                error: error.error?.message || 'Error calling Gemini API'
            });
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;

        res.json({ result: text });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 API Proxy server running on http://localhost:${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/health`);
});
