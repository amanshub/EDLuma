import { useEffect, useRef } from 'react';
import PresenceOrb from './PresenceOrb';
import StatusIndicator from './StatusIndicator';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useEd } from '../context/EdContext';

const BG = '#14192B';
const TEXT = '#F2EFE9';
const MUTED = '#8B92AC';

export default function ChatWindow() {
  const { messages, sendMessage, isThinking, deviationActive, triggerDeviation, userName } =
    useEd();
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isThinking]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 pt-8 pb-4" style={{ backgroundColor: BG }}>
      {/* Corner status indicator */}
      <div className="w-full max-w-md flex justify-end mb-2">
        <StatusIndicator deviationActive={deviationActive} />
      </div>

      {/* The orb — signature element, not a dashboard */}
      <PresenceOrb deviationActive={deviationActive} />

      <h2
        className="mt-2 mb-6 text-xl"
        style={{ color: TEXT, fontFamily: "'Fraunces', serif" }}
      >
        {userName ? `Hi, ${userName}.` : 'Ed'}
      </h2>

      {/* Chat history */}
      <div
        ref={scrollRef}
        className="w-full max-w-md flex-1 overflow-y-auto space-y-3 mb-4"
        style={{ maxHeight: '48vh' }}
      >
        {messages.length === 0 && (
          <p className="text-center mt-8" style={{ color: MUTED }}>
            Say hello, or just sit with Ed for a moment.
          </p>
        )}
        {messages.map((m, i) => (
          <ChatMessage key={i} {...m} />
        ))}
        {isThinking && (
          <p className="text-sm px-2" style={{ color: MUTED, fontFamily: "'IBM Plex Mono', monospace" }}>
            Ed is thinking...
          </p>
        )}
      </div>

      <div className="w-full max-w-md">
        <ChatInput onSend={sendMessage} disabled={isThinking} />
      </div>

      {/* Demo control — not part of the real product UI, wired here for judges */}
      <button
        onClick={triggerDeviation}
        disabled={deviationActive}
        className="mt-6 text-xs underline disabled:no-underline disabled:opacity-40"
        style={{ color: MUTED }}
      >
        {deviationActive ? 'Deviation simulated' : 'Simulate deviation (demo)'}
      </button>
    </div>
  );
}