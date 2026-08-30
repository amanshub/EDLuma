import { motion } from 'framer-motion';

const AMBER = '#E8A659';
const CARD = '#1C2340';
const BG = '#14192B';
const TEXT = '#F2EFE9';

export default function ChatMessage({ role, content, isDeviationOpener }) {
  const isUser = role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className="max-w-[75%] rounded-2xl px-4 py-3 leading-relaxed"
        style={{
          backgroundColor: isUser ? AMBER : CARD,
          color: isUser ? BG : TEXT,
          borderTopRightRadius: isUser ? 4 : undefined,
          borderTopLeftRadius: !isUser ? 4 : undefined,
        }}
      >
        {isDeviationOpener && (
          <div
            className="text-xs mb-1 uppercase tracking-wide opacity-70"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Ed checked in
          </div>
        )}
        <p style={{ fontFamily: "'Inter', sans-serif" }}>{content}</p>
      </div>
    </motion.div>
  );
}