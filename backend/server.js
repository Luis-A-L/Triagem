const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// OpenAI API config
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Proxy endpoint for OpenAI API
app.post('/api/gemini', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        if (!OPENAI_API_KEY) {
            console.error('OPENAI_API_KEY not found in .env');
            return res.status(500).json({ error: 'API key not configured on server' });
        }

        console.log('Calling OpenAI API...');

        const payload = {
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Você é um assistente jurídico útil e preciso." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7
        };

        // Call OpenAI API
        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('OpenAI Error:', errorData);
            return res.status(response.status).json({
                error: errorData.error?.message || 'Error calling OpenAI API'
            });
        }

        const data = await response.json();
        const completion = data.choices[0].message.content;

        console.log('OpenAI Success:', completion.substring(0, 50) + '...');
        res.json({ result: completion }); // Maintain 'result' format for frontend compatibility

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 API Proxy server running on http://localhost:${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/health`);
});
