import React, { useEffect, useState } from 'react'
import { Header } from './components/layout/header'
import { ManagementPage } from './pages/ManagementPage'

export const App: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} />
      <main>
        <ManagementPage />
      </main>
    </div>
  );
};
