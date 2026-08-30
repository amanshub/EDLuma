const SAGE = '#7FA69B';
const AMBER = '#E8A659';

export default function StatusIndicator({ deviationActive = false }) {
  const color = deviationActive ? AMBER : SAGE;
  const label = deviationActive ? 'checking in' : 'calm';

  return (
    <div className="flex items-center gap-2 text-sm" style={{ color: '#8B92AC' }}>
      <span
        aria-hidden="true"
        className="inline-block rounded-full"
        style={{ width: 8, height: 8, backgroundColor: color }}
      />
      <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{label}</span>
    </div>
  );
}