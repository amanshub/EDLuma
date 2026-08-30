import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Set to true if Anthropic credits run out mid-hackathon
const USE_OPENROUTER_FALLBACK = true;

async function callClaude(systemPrompt, messages) {
  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1000,
    system: systemPrompt,
    messages,
  });
  return response.content[0].text;
}

async function callOpenRouter(systemPrompt, messages) {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'http://localhost:5173',
      'X-Title': 'Ed (LUMA)',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openrouter/free',
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
    }),
  });
  const data = await res.json();
  console.log('OpenRouter raw response:', JSON.stringify(data, null, 2));
  if (!data.choices) {
    throw new Error(`OpenRouter error: ${data.error?.message || 'unknown'}`);
  }
  return data.choices[0].message.content;
}

app.post('/api/chat', async (req, res) => {
  try {
    const { systemPrompt, messages } = req.body;
    const reply = USE_OPENROUTER_FALLBACK
      ? await callOpenRouter(systemPrompt, messages)
      : await callClaude(systemPrompt, messages);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Agent call failed' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Ed's server listening on ${PORT}`));