import React, { useState } from 'react';
import Sidebar from './components/sidebar';

function App() {

  const [employees, setEmployees] = useState([
    { id: 1, name: "Marcus Miller", role: "Head Chef", department: "Kitchen", status: "Active" },
    { id: 2, name: "Sophia Martinez", role: "Server Lead", department: "Front of House", status: "Active" },
    { id: 3, name: "David Chen", role: "Line Cook", department: "Kitchen", status: "On Leave" }
  ]);

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
                {/* Employee Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 max-w-4xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm font-semibold">
                <th className="p-4">Name</th>
                <th className="p-4">Role</th>
                <th className="p-4">Department</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-medium text-slate-900">{employee.name}</td>
                  <td className="p-4">{employee.role}</td>
                  <td className="p-4">{employee.department}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      employee.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>

    </div>
  );
}

export default App;