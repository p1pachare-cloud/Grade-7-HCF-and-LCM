// api/elevenlabs.js
// Serverless proxy function for dynamic ElevenLabs text-to-speech requests

import { VOICE_ID, MODEL_ID, STYLE_SETTINGS } from '../src/utils/styleSettings.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, style = 'statement' } = req.body;
  const apiKey = process.env.VITE_ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Serverless ElevenLabs API key not configured' });
  }

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        voice_settings: STYLE_SETTINGS[style] || STYLE_SETTINGS.statement
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).send(errText);
    }

    const audioBuffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    return res.status(200).send(Buffer.from(audioBuffer));
  } catch (err) {
    console.error('Serverless ElevenLabs proxy error:', err);
    return res.status(500).json({ error: 'Internal server proxy error' });
  }
}
