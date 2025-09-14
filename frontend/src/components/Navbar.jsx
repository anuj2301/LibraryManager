import { BookOpen, Menu, X, Sun, Moon, LogOut, User } from "lucide-react"
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ isDarkMode, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <nav className="bg-gradient-to-r from-stone-900 to-stone-800 shadow-lg dark:from-stone-950 dark:to-stone-900 text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <BookOpen size={32} className="text-amber-400" />
            <span className="text-2xl font-bold tracking-wider">Athenaeum</span>
            <span className="hidden sm:inline text-sm text-stone-400">
              Library Management
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#books" className="hover:text-amber-400 transition-colors duration-200">Books</a>
            <a href="#users" className="hover:text-amber-400 transition-colors duration-200">Users</a>
            <a href="#reports" className="hover:text-amber-400 transition-colors duration-200">Reports</a>
            
            {/* User Info */}
            <div className="flex items-center space-x-2 text-sm">
              <User size={16} className="text-amber-400" />
              <span className="text-stone-300">{user?.fullName || user?.username}</span>
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-stone-700 hover:bg-stone-600 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-white" />}
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-200"
              aria-label="Logout"
            >
              <LogOut size={16} />
              <span className="text-sm">Logout</span>
            </button>
          </div>

          {/* Mobile menu button and controls */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-stone-700 hover:bg-stone-600 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-white" />}
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-200"
              aria-label="Logout"
            >
              <LogOut size={16} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-white bg-stone-700 hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMenuOpen}
              aria-label="Open main menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pb-4 transition-all duration-300 ease-in-out`}>
        <div className="flex flex-col items-center space-y-2">
          <div className="text-center py-2 text-amber-400 font-medium">
            {user?.fullName || user?.username}
          </div>
          <a href="#books" className="w-full text-center py-2 hover:bg-stone-700 rounded-md">Books</a>
          <a href="#users" className="w-full text-center py-2 hover:bg-stone-700 rounded-md">Users</a>
          <a href="#reports" className="w-full text-center py-2 hover:bg-stone-700 rounded-md">Reports</a>
        </div>
      </div>
    </nav>
  );
}