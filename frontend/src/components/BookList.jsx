import { BookOpen, Search } from "lucide-react"
import { useState } from 'react'

// ---------------- BookList Component ----------------
export default function BookList({ isDarkMode, books = [], onDelete, onToggle }) {
  const [searchTerm, setSearchTerm] = useState('');

  // filter locally
  const filtered = books.filter(b => {
    const q = searchTerm.toLowerCase();
    return !q || (b.title && b.title.toLowerCase().includes(q)) || (b.author && b.author.toLowerCase().includes(q)) || (b.isbn && b.isbn.toLowerCase().includes(q));
  });

  return (
    <div className="bg-white dark:bg-stone-800 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 p-6 mb-8 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <BookOpen size={24} className="text-primary-500" />
          <h2 className="text-2xl font-bold text-stone-800 dark:text-white">Library Collection</h2>
        </div>
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-stone-400" />
          </div>
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search books..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((book) => (
          <div key={book.id} className="bg-stone-50 dark:bg-stone-700 rounded-lg p-4 border border-stone-200 dark:border-stone-600 transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-stone-800 dark:text-white mb-1">{book.title}</h3>
                <p className="text-stone-600 dark:text-stone-300 mb-2">by {book.author}</p>
                <div className="flex flex-wrap items-center space-x-2 text-sm">
                  <span className="bg-stone-200 dark:bg-stone-600 text-stone-800 dark:text-stone-200 px-2 py-1 rounded-full">{book.genre || 'N/A'}</span>
                  <span className="text-stone-500 dark:text-stone-400">ISBN: {book.isbn || '-'}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${book.available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                  {book.available ? 'Available' : 'Issued'}
                </span>
                <button
                  onClick={() => onToggle?.(book)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm"
                >
                  Toggle Availability
                </button>
                <button
                  onClick={() => onDelete?.(book.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}