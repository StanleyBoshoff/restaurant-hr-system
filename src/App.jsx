import React from 'react';
import Sidebar from './components/sidebar';

function App() {
  return (
    // This 'flex' class splits our screen: Sidebar on the left, main content on the right
    <div className="flex bg-slate-100 min-h-screen w-full">
      
      {/* Left Sidebar */}
      <Sidebar />

      {/* Right Main Content Window */}
      <main className="flex-1 p-8">
        <header className="border-b border-slate-200 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Employee Directory</h1>
          <p className="text-sm text-slate-500 mt-1">View, edit, and add active restaurant staff members.</p>
        </header>

        {/* Temporary Placeholder Card for our upcoming Database Table */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-4xl">
          <p className="text-slate-600 italic">
            [Data Grid Component will be placed here in Module 4 to track chefs, waiters, and management]
          </p>
        </div>
      </main>

    </div>
  );
}

export default App;