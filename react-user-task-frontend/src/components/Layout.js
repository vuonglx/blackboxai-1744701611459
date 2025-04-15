import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className={`text-xl font-semibold text-gray-800 ${sidebarOpen ? '' : 'hidden'}`}>
            Dashboard
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 hover:bg-gray-100 ${
                    isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700'
                  }`
                }
              >
                <i className="fas fa-tachometer-alt mr-3"></i>
                {sidebarOpen && 'Dashboard'}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 hover:bg-gray-100 ${
                    isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700'
                  }`
                }
              >
                <i className="fas fa-users mr-3"></i>
                {sidebarOpen && 'User Management'}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 hover:bg-gray-100 ${
                    isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700'
                  }`
                }
              >
                <i className="fas fa-tasks mr-3"></i>
                {sidebarOpen && 'Task Management'}
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search"
            />
          </div>
          <div className="relative">
            <button
              aria-haspopup="true"
              aria-expanded="false"
              className="flex items-center space-x-2 focus:outline-none"
              onClick={handleLogout}
              title="Logout"
            >
              <span className="text-gray-700 font-medium">Admin</span>
              <i className="fas fa-user-circle text-2xl text-gray-600"></i>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 flex-grow overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
