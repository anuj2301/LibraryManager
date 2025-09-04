import { useState } from "react";
import { BookOpen, Users, Plus, Search, Menu, X, Sun, Moon } from "lucide-react";

// Main App Component with Theme Context
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-stone-900' : 'bg-stone-50'}`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className={`text-4xl font-bold mb-2 transition-colors duration-300 ${isDarkMode ? 'text-stone-100' : 'text-stone-800'}`}>Welcome to Athenaeum</h1>
          <p className={`text-lg transition-colors duration-300 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>Your comprehensive library management solution</p>
        </div>
        <BookForm isDarkMode={isDarkMode} />
        <BookList isDarkMode={isDarkMode} />
        <UserList isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

// Navbar Component
function Navbar({ isDarkMode, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`shadow-lg border-b-2 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-r from-stone-900 to-stone-800 border-stone-700' 
        : 'bg-gradient-to-r from-stone-800 to-stone-700 border-stone-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-stone-200" />
            <span className="text-2xl font-bold text-stone-100 tracking-wide">Athenaeum</span>
            <span className="text-sm text-stone-300 hidden sm:block">Library Management</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#books" className={`text-stone-200 hover:text-white transition-colors duration-200 px-3 py-2 rounded-md ${
              isDarkMode ? 'hover:bg-stone-700' : 'hover:bg-stone-600'
            }`}>
              Books
            </a>
            <a href="#users" className={`text-stone-200 hover:text-white transition-colors duration-200 px-3 py-2 rounded-md ${
              isDarkMode ? 'hover:bg-stone-700' : 'hover:bg-stone-600'
            }`}>
              Users
            </a>
            <a href="#reports" className={`text-stone-200 hover:text-white transition-colors duration-200 px-3 py-2 rounded-md ${
              isDarkMode ? 'hover:bg-stone-700' : 'hover:bg-stone-600'
            }`}>
              Reports
            </a>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg text-stone-200 transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-stone-700 hover:bg-stone-600' 
                  : 'bg-stone-600 hover:bg-stone-500'
              }`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg text-stone-200 transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-stone-700 hover:bg-stone-600' 
                  : 'bg-stone-600 hover:bg-stone-500'
              }`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-stone-200 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <a href="#books" className={`text-stone-200 hover:text-white transition-colors duration-200 px-3 py-2 rounded-md ${
                isDarkMode ? 'hover:bg-stone-700' : 'hover:bg-stone-600'
              }`}>
                Books
              </a>
              <a href="#users" className={`text-stone-200 hover:text-white transition-colors duration-200 px-3 py-2 rounded-md ${
                isDarkMode ? 'hover:bg-stone-700' : 'hover:bg-stone-600'
              }`}>
                Users
              </a>
              <a href="#reports" className={`text-stone-200 hover:text-white transition-colors duration-200 px-3 py-2 rounded-md ${
                isDarkMode ? 'hover:bg-stone-700' : 'hover:bg-stone-600'
              }`}>
                Reports
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// BookForm Component
function BookForm({ isDarkMode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`rounded-xl shadow-lg border p-6 mb-8 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-stone-800 border-stone-700' 
        : 'bg-stone-100 border-stone-200'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Plus className={`h-6 w-6 ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`} />
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-stone-100' : 'text-stone-800'}`}>Add New Book</h2>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-md ${
            isDarkMode 
              ? 'bg-stone-600 hover:bg-stone-500' 
              : 'bg-stone-700 hover:bg-stone-800'
          }`}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`}>Title</label>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-colors duration-200 ${
                isDarkMode 
                  ? 'border-stone-600 bg-stone-700 text-stone-100' 
                  : 'border-stone-300 bg-white text-stone-900'
              }`}
              placeholder="Enter book title"
            />
          </div>
          <div>
            <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`}>Author</label>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-colors duration-200 ${
                isDarkMode 
                  ? 'border-stone-600 bg-stone-700 text-stone-100' 
                  : 'border-stone-300 bg-white text-stone-900'
              }`}
              placeholder="Enter author name"
            />
          </div>
          <div>
            <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`}>ISBN</label>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-colors duration-200 ${
                isDarkMode 
                  ? 'border-stone-600 bg-stone-700 text-stone-100' 
                  : 'border-stone-300 bg-white text-stone-900'
              }`}
              placeholder="Enter ISBN"
            />
          </div>
          <div>
            <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`}>Genre</label>
            <select className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-colors duration-200 ${
              isDarkMode 
                ? 'border-stone-600 bg-stone-700 text-stone-100' 
                : 'border-stone-300 bg-white text-stone-900'
            }`}>
              <option>Fiction</option>
              <option>Non-Fiction</option>
              <option>Science</option>
              <option>History</option>
              <option>Biography</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <button className={`w-full text-white py-3 rounded-lg transition-colors duration-200 font-semibold shadow-md ${
              isDarkMode 
                ? 'bg-stone-600 hover:bg-stone-500' 
                : 'bg-stone-700 hover:bg-stone-800'
            }`}>
              Add Book to Library
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// BookList Component
function BookList({ isDarkMode }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const mockBooks = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0-7432-7356-5", status: "Available", genre: "Fiction" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0-06-112008-4", status: "Checked Out", genre: "Fiction" },
    { id: 3, title: "1984", author: "George Orwell", isbn: "978-0-452-28423-4", status: "Available", genre: "Dystopian Fiction" },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", isbn: "978-0-14-143951-8", status: "Available", genre: "Romance" }
  ];

  return (
    <div className={`rounded-xl shadow-lg border p-6 mb-8 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-stone-800 border-stone-700' 
        : 'bg-stone-100 border-stone-200'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BookOpen className={`h-6 w-6 ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`} />
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-stone-100' : 'text-stone-800'}`}>Library Collection</h2>
        </div>
        <div className={`flex items-center space-x-2 rounded-lg border px-3 py-2 transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-stone-700 border-stone-600' 
            : 'bg-white border-stone-300'
        }`}>
          <Search className={`h-5 w-5 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`} />
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`outline-none bg-transparent ${
              isDarkMode 
                ? 'text-stone-100 placeholder-stone-400' 
                : 'text-stone-800 placeholder-stone-500'
            }`}
          />
        </div>
      </div>

      <div className="grid gap-4">
        {mockBooks.map((book) => (
          <div key={book.id} className={`rounded-lg border p-4 hover:shadow-md transition-all duration-200 ${
            isDarkMode 
              ? 'bg-stone-700 border-stone-600' 
              : 'bg-white border-stone-200'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex-1">
                <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-stone-100' : 'text-stone-800'}`}>{book.title}</h3>
                <p className={`mb-2 ${isDarkMode ? 'text-stone-300' : 'text-stone-600'}`}>by {book.author}</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className={`px-2 py-1 rounded transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-stone-600 text-stone-200' 
                      : 'bg-stone-200 text-stone-800'
                  }`}>{book.genre}</span>
                  <span className={isDarkMode ? 'text-stone-400' : 'text-stone-600'}>ISBN: {book.isbn}</span>
                </div>
              </div>
              <div className="mt-3 md:mt-0 flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  book.status === 'Available' 
                    ? isDarkMode 
                      ? 'bg-green-900 text-green-200' 
                      : 'bg-green-100 text-green-800'
                    : isDarkMode 
                      ? 'bg-red-900 text-red-200' 
                      : 'bg-red-100 text-red-800'
                }`}>
                  {book.status}
                </span>
                <button className={`text-white px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-stone-500 hover:bg-stone-400' 
                    : 'bg-stone-600 hover:bg-stone-700'
                }`}>
                  {book.status === 'Available' ? 'Check Out' : 'Return'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// UserList Component
function UserList({ isDarkMode }) {
  const mockUsers = [
    { id: 1, name: "Emily Johnson", email: "emily@email.com", booksCheckedOut: 2, memberSince: "2023-01-15" },
    { id: 2, name: "Michael Chen", email: "michael@email.com", booksCheckedOut: 1, memberSince: "2023-03-22" },
    { id: 3, name: "Sarah Williams", email: "sarah@email.com", booksCheckedOut: 0, memberSince: "2022-11-08" },
    { id: 4, name: "David Brown", email: "david@email.com", booksCheckedOut: 3, memberSince: "2023-05-10" }
  ];

  return (
    <div className={`rounded-xl shadow-lg border p-6 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-stone-800 border-stone-700' 
        : 'bg-stone-100 border-stone-200'
    }`}>
      <div className="flex items-center space-x-3 mb-6">
        <Users className={`h-6 w-6 ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`} />
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-stone-100' : 'text-stone-800'}`}>Library Members</h2>
      </div>

      <div className="grid gap-4">
        {mockUsers.map((user) => (
          <div key={user.id} className={`rounded-lg border p-4 hover:shadow-md transition-all duration-200 ${
            isDarkMode 
              ? 'bg-stone-700 border-stone-600' 
              : 'bg-white border-stone-200'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex-1">
                <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-stone-100' : 'text-stone-800'}`}>{user.name}</h3>
                <p className={`mb-2 ${isDarkMode ? 'text-stone-300' : 'text-stone-600'}`}>{user.email}</p>
                <p className={`text-sm ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>Member since: {user.memberSince}</p>
              </div>
              <div className="mt-3 md:mt-0 flex items-center space-x-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${isDarkMode ? 'text-stone-100' : 'text-stone-800'}`}>{user.booksCheckedOut}</div>
                  <div className={`text-xs ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>Books Out</div>
                </div>
                <button className={`text-white px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-stone-500 hover:bg-stone-400' 
                    : 'bg-stone-600 hover:bg-stone-700'
                }`}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}