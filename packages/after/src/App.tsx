import React from 'react'
import { Header } from './components/layout/header'
import { ManagementPage } from './pages/ManagementPage'

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-muted">
      <Header />
      <main>
        <ManagementPage />
      </main>
    </div>
  );
};
