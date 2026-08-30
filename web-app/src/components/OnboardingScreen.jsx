import { useState } from 'react';
import { motion } from 'framer-motion';
import { useEd } from '../context/EdContext';

const BG = '#14192B';
const CARD = '#1C2340';
const AMBER = '#E8A659';
const TEXT = '#F2EFE9';
const MUTED = '#8B92AC';

export default function OnboardingScreen() {
  const { completeOnboarding } = useEd();
  const [step, setStep] = useState(0);

  const steps = [
    {
      heading: 'This is Ed.',
      body: "A quiet companion that notices when your day looks different than usual, and checks in — gently, honestly, never as a diagnosis.",
    },
    {
      heading: 'Your privacy, plainly stated',
      bullets: [
        'No camera. Ed only sees motion and light signals, and whatever you say to it.',
        "You're known to Ed only by an anonymized codename — never by anything that identifies you.",
        'This connection is private: just you, Ed, and your device. Nothing is shared elsewhere.',
      ],
    },
  ];

  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: BG, color: TEXT }}
    >
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-sm rounded-2xl p-8"
        style={{ backgroundColor: CARD }}
      >
        <h1
          className="text-3xl mb-4"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {current.heading}
        </h1>

        {current.body && (
          <p className="leading-relaxed" style={{ color: MUTED }}>
            {current.body}
          </p>
        )}

        {current.bullets && (
          <ul className="space-y-3 mt-2">
            {current.bullets.map((b) => (
              <li key={b} className="flex gap-3 leading-relaxed" style={{ color: MUTED }}>
                <span style={{ color: AMBER }}>•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => (isLast ? completeOnboarding() : setStep(step + 1))}
          className="mt-8 w-full rounded-full py-3 font-medium transition-opacity hover:opacity-90"
          style={{ backgroundColor: AMBER, color: BG }}
        >
          {isLast ? "I understand — let's begin" : 'Continue'}
        </button>

        <div className="flex justify-center gap-2 mt-6">
          {steps.map((_, i) => (
            <span
              key={i}
              className="rounded-full"
              style={{
                width: 6,
                height: 6,
                backgroundColor: i === step ? AMBER : '#3A4160',
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}