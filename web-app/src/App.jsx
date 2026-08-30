import { EdProvider, useEd } from './context/EdContext';
import OnboardingScreen from './components/OnboardingScreen';
import ChatWindow from './components/ChatWindow';

function AppShell() {
  const { onboarded } = useEd();
  return onboarded ? <ChatWindow /> : <OnboardingScreen />;
}

export default function App() {
  return (
    <EdProvider>
      <AppShell />
    </EdProvider>
  );
}