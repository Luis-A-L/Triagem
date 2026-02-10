// const fetch = require('node-fetch'); // Native fetch in Node 18+

module.exports = async ({ req, res, log, error }) => {
    try {
        // Parse request body
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { prompt } = body;

        if (!prompt) {
            return res.json({ error: 'Prompt is required' }, 400);
        }

        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

        if (!GEMINI_API_KEY) {
            error('GEMINI_API_KEY not configured');
            return res.json({ error: 'API key not configured on server' }, 500);
        }

        log('Calling Gemini API...');

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
            const errorData = await response.json();
            error('Gemini API error:', JSON.stringify(errorData));
            return res.json({
                error: errorData.error?.message || 'Error calling Gemini API'
            }, response.status);
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;

        log('Success! Response length:', text.length);

        return res.json({ result: text });

    } catch (err) {
        error('Function error:', err.message);
        return res.json({ error: err.message }, 500);
    }
};
