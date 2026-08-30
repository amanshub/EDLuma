import { createContext, useCallback, useContext, useState } from 'react';
import { ED_SYSTEM_PROMPT } from '../data/systemPrompt';
import { sendChatMessage } from '../utils/api';
 
const EdContext = createContext(null);
 
// The line Ed opens with when a deviation triggers the conversation
// (rather than the person opening chat themselves). Kept here, not in the
// LLM call, so it's instant and doesn't cost a roundtrip.
const DEVIATION_OPENER =
  "I noticed things have been quieter than usual today — no rush, just wanted to check in.";
 
export function EdProvider({ children, userName = '' }) {
  const [deviationActive, setDeviationActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
 
  const completeOnboarding = useCallback(() => setOnboarded(true), []);
 
  const triggerDeviation = useCallback(() => {
    setDeviationActive(true);
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: DEVIATION_OPENER, isDeviationOpener: true },
    ]);
  }, []);
 
  const clearDeviation = useCallback(() => setDeviationActive(false), []);
 
  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed) return;
 
      const userMessage = { role: 'user', content: trimmed };
      const nextMessages = [...messages, userMessage];
      setMessages(nextMessages);
      setIsThinking(true);
 
      try {
        // Give the model light context on deviation state + name, without
        // baking it permanently into the system prompt.
        const contextNote = deviationActive
          ? '\n\n[Context: a deviation from routine was just detected — you already opened with a check-in about this.]'
          : '';
        const nameNote = userName ? `\n\n[The person's name/codename: ${userName}]` : '';
 
        const reply = await sendChatMessage(
          ED_SYSTEM_PROMPT + contextNote + nameNote,
          nextMessages.map(({ role, content }) => ({ role, content }))
        );
 
        setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              "Sorry — I'm having trouble connecting right now. Give it a moment and try again.",
            isError: true,
          },
        ]);
        console.error('Ed chat error:', err);
      } finally {
        setIsThinking(false);
      }
    },
    [messages, deviationActive, userName]
  );
 
  const value = {
    deviationActive,
    triggerDeviation,
    clearDeviation,
    messages,
    sendMessage,
    isThinking,
    onboarded,
    completeOnboarding,
    userName,
  };
 
  return <EdContext.Provider value={value}>{children}</EdContext.Provider>;
}
 
export function useEd() {
  const ctx = useContext(EdContext);
  if (!ctx) throw new Error('useEd must be used within an EdProvider');
  return ctx;
}
 
