import React, { useState, useEffect } from 'react'; // 1. Added useEffect import here
import Sidebar from './components/sidebar';

function App() {
  // --- STATE VARIABLES ---
  const [employees, setEmployees] = useState([]);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newDept, setNewDept] = useState("Kitchen"); 

  // --- DATABASE FUNCTIONS ---

  // Function A: Reads records from MariaDB via our PHP script
  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost/restaurant-api/api.php');
      const data = await response.json();
      setEmployees(data); // Injects the live database array into our screen layout
    } catch (error) {
      console.error("Error communicating with the HR backend database:", error);
    }
  };

  // Function B: Fires automatically the exact millisecond the app finishes mounting
  useEffect(() => {
    fetchEmployees();
  }, []); // Empty brackets mean: run exactly once on startup

    // Function C: Fires when someone submits the form to record a new staff entry
  const handleAddEmployee = async (e) => {
    e.preventDefault();

    if (newName.trim() === "") return;

    const employeePayload = {
      name: newName,
      role: newRole || "Staff",
      department: newDept
    };

    try {
      const response = await fetch('http://localhost/restaurant-api/api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeePayload)
      });

      if (response.ok) {
        fetchEmployees(); 
        setNewName("");   
        setNewRole("");
      } else {
        alert("Backend error: Failed to save record to MariaDB.");
      }
    } catch (error) {
      console.error("Network submission failure:", error);
    }
  }; // This closes handleAddEmployee completely!

  // Function D: Fires when someone clicks the 'Terminate' button
  const handleDeleteEmployee = async (id) => {
    if (!window.confirm("Security Action Required: Are you sure you want to completely remove this employee from the central ledger?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost/restaurant-api/api.php?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchEmployees(); // Refresh list on success
      } else {
        alert("Server Error: Database refused to clear the requested record.");
      }
    } catch (error) {
      console.error("Network communication failure during record deletion:", error);
    }
  }; // This closes handleDeleteEmployee completely!




  // --- USER INTERFACE RENDER (JSX) ---
  return (
    <div className="flex bg-slate-100 min-h-screen w-full">
      
      {/* Left Sidebar Navigation */}
      <Sidebar />

      {/* Right Main Content Window */}
      <main className="flex-1 p-8">
        <header className="border-b border-slate-200 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Employee Directory</h1>
          <p className="text-sm text-slate-500 mt-1">View, edit, and add active restaurant staff members.</p>
        </header>

        {/* Add Employee Form Container */}
        <form onSubmit={handleAddEmployee} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-4xl mb-6 flex flex-wrap gap-4 items-end">

          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Employee Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-800 bg-white"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Job Role</label>
            <input
              type="text"
              placeholder="e.g. Sous chef"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-800 bg-white"
            />
          </div>

          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Department</label>
            <select
              value={newDept} // Removed the structural quotes typo here
              onChange={(e) => setNewDept(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-800 bg-white"
            >
              <option value="Kitchen">Kitchen</option>                      
              <option value="Front of House">Front of House</option>          
              <option value="Management">Management</option>          
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2 rounded-lg transition shadow-sm h-[38px] cursor-pointer"
          >
            Add Staff
          </button>
        </form>

        {/* Employee Table Container */}
                {/* Employee Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 max-w-4xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm font-semibold">
                <th className="p-4">Name</th>
                <th className="p-4">Role</th>
                <th className="p-4">Department</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
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
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDeleteEmployee(employee.id)}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition cursor-pointer inline-block"
                    >
                      Terminate
                    </button>
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
