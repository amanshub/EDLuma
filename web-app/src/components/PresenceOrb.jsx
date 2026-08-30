import { motion } from 'framer-motion';

const SAGE = '#7FA69B';
const AMBER = '#E8A659';

/**
 * The signature "orb, not dashboard" element. Breathes continuously;
 * shifts color temperature between sage (calm) and amber (deviation)
 * based on sensor state.
 */
export default function PresenceOrb({ deviationActive = false, size = 160 }) {
  const color = deviationActive ? AMBER : SAGE;

  return (
    <div className="flex items-center justify-center" style={{ width: size, height: size }}>
      <motion.div
        aria-hidden="true"
        style={{
          width: size * 0.7,
          height: size * 0.7,
          borderRadius: '9999px',
          background: `radial-gradient(circle at 35% 30%, ${color}dd, ${color}66 70%, transparent 100%)`,
          boxShadow: `0 0 ${size * 0.4}px ${color}55`,
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.85, 1, 0.85],
        }}
        transition={{
          duration: deviationActive ? 2.6 : 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}