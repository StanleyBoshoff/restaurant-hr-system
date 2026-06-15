import React from 'react';

function Sidebar() {
    return(
        <div className="w-64 bg-zinc-900 text-white min-h-screen p-6 flex flex-col justify-between">
            <div>
                {/* Branding */}
                <h2 className="text-xl font-bold tracking-wider text-orange-400">BistroConnect</h2>
                <p className="text-xs text-slate-400 mt-1">HR Management Portal</p>

                {/* Navigation Links */}
                <nav className="mt-8 space-y-4">
                    <div className="p-2 bg-slate-800 rounded font-medium cursor-pointer">👥 Employees</div>
                    <div className="p-2 text-slate-400 hover:bg-slate-800 rounded cursor-pointer transition">📅 Shift Schedule</div>
                    <div className="p-2 text-slate-400 hover:bg-slate-800 rounded cursor-pointer transition">💰 Payroll Tracking</div>
                </nav>
            </div>

            {/* Footer */}
            <div className="text-xs text-slate-500 border-t border-slate-800 pt-4">
                status: Secure Active Session
            </div>
        </div>
    );
}

export default Sidebar;