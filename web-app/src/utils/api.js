// Talks to the Express backend's POST /api/chat.
// Backend already accepts { systemPrompt, messages } and returns { reply }.

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';

/**
 * @param {string} systemPrompt
 * @param {{role: 'user'|'assistant', content: string}[]} messages
 * @returns {Promise<string>} the assistant's reply text
 */
export async function sendChatMessage(systemPrompt, messages) {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ systemPrompt, messages }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Chat request failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  return data.reply;
}