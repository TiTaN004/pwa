// src/components/InstallPWAButton.jsx
import { useEffect, useState } from 'react';

const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      setIsVisible(false);
    }
  };

  return isVisible ? (
    <button onClick={handleClick} className="fixed bottom-5 right-5 p-3 bg-blue-600 text-white rounded-lg shadow-lg">
      📲 Install App
    </button>
  ) : null;
};

export default InstallPWAButton;

