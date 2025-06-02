import React from 'react';
import Header from './components/Header';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;