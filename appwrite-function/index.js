module.exports = async ({ req, res, log, error }) => {
    try {
        // Parse request body
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { prompt } = body;

        if (!prompt) {
            return res.json({ error: 'Prompt is required' }, 400);
        }

        log('Calling OpenAI API...');

        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
        const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

        if (!OPENAI_API_KEY) {
            error('OPENAI_API_KEY not configured');
            return res.json({ error: 'Server configuration error: Missing API Key' }, 500);
        }

        const payload = {
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Você é um assistente jurídico útil e preciso." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7
        };

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
            error('OpenAI API error:', JSON.stringify(errorData));
            return res.json({
                error: errorData.error?.message || 'Error calling OpenAI API'
            }, response.status);
        }

        const data = await response.json();
        const completion = data.choices[0].message.content;

        return res.json({
            response: completion
        });

    } catch (err) {
        error('Function error:', err.message);
        return res.json({ error: err.message }, 500);
    }
};
