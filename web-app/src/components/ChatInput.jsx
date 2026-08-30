import { useState } from 'react';
import { Send } from 'lucide-react';

const CARD = '#1C2340';
const AMBER = '#E8A659';
const TEXT = '#F2EFE9';

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('');

  const submit = () => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div
      className="flex items-center gap-2 rounded-full px-4 py-2"
      style={{ backgroundColor: CARD }}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Talk to Ed..."
        disabled={disabled}
        className="flex-1 bg-transparent outline-none"
        style={{ color: TEXT, fontFamily: "'Inter', sans-serif" }}
      />
      <button
        onClick={submit}
        disabled={disabled || !value.trim()}
        aria-label="Send"
        className="flex items-center justify-center rounded-full p-2 transition-opacity disabled:opacity-40"
        style={{ backgroundColor: AMBER }}
      >
        <Send size={16} color={'#14192B'} />
      </button>
    </div>
  );
}