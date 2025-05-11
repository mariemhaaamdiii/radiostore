import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, ListOrdered, Tag, Menu, X, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile }) => {
  const [isOpen, setIsOpen] = useState(!isMobile);
  const location = useLocation();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, text: 'Dashboard' },
    { path: '/products', icon: <ShoppingBag size={20} />, text: 'Products' },
    { path: '/categories', icon: <Tag size={20} />, text: 'Categories' },
    { path: '/users', icon: <Users size={20} />, text: 'Users' },
    { path: '/orders', icon: <ListOrdered size={20} />, text: 'Orders' },
  ];

  const handleLogout = async () => {
    await logout();
    window.location.href = '/logged-out';
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu toggle button */}
      {isMobile && (
        <button 
          className="lg:hidden fixed top-4 left-4 z-50 p-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-md shadow-md"
          onClick={toggleSidebar}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full transition-all duration-300 ease-in-out z-40
                  ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                  bg-gray-800 dark:bg-gray-900 text-white w-64 shadow-xl`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-center space-x-2">
              <ShoppingBag size={28} className="text-blue-500" />
              <h1 className="text-xl font-bold">Quantum Radio</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-6 py-3 text-sm transition duration-150 hover:bg-gray-700
                               ${location.pathname === item.path ? 'bg-gray-700 border-l-4 border-blue-500 pl-5' : ''}`}
                    onClick={() => isMobile && setIsOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <button 
              onClick={toggleTheme}
              className="flex items-center px-6 py-3 w-full text-sm transition duration-150 hover:bg-gray-700 rounded"
            >
              <span className="mr-3">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </span>
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            
            <button 
              onClick={handleLogout}
              className="flex items-center px-6 py-3 w-full text-sm text-red-400 transition duration-150 hover:bg-gray-700 rounded mt-2"
            >
              <span className="mr-3">
                <LogOut size={20} />
              </span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;