import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import CardDesigner from './components/CardDesigner';

function App() {
  const [view, setView] = useState<'dashboard' | 'designer'>('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex gap-4 p-4 bg-white shadow-sm border-b mb-6">
        <button
          className={`px-4 py-2 rounded font-semibold ${view === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setView('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${view === 'designer' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setView('designer')}
        >
          Card Designer
        </button>
      </div>
      {view === 'dashboard' ? (
        <Dashboard />
      ) : (
        <CardDesigner />
      )}
    </div>
  );
}

export default App;
