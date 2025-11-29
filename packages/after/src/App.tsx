import React from 'react'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { Header } from './components/layout/Header'
import { ManagementPage } from './pages/ManagementPage'

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <ManagementPage />
        </main>
      </div>
    </ThemeProvider>
  );
};

