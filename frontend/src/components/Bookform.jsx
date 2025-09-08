import { Plus } from "lucide-react"
import { useState } from 'react'
import axios from 'axios'

// ---------------- BookForm Component ----------------
export default function BookForm({ isDarkMode, onAdded }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [genre, setGenre] = useState("Fiction");

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/books", { title, author, isbn, genre, available: true });
      setTitle(""); setAuthor(""); setIsbn(""); setGenre("Fiction");
      onAdded?.();
      alert("Book added");
    } catch (err) {
      console.error(err);
      alert("Failed to add book");
    }
  };

  return (
    <div className="bg-white dark:bg-stone-800 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 p-6 mb-8 transition-colors duration-300" id="books">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <Plus size={24} className="text-primary-500" />
          <h2 className="text-2xl font-bold text-stone-800 dark:text-white">Add New Book</h2>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 bg-stone-700 text-white rounded-lg hover:bg-stone-600 transition-colors duration-200"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      <form className={`${isExpanded ? 'grid' : 'hidden'} grid-cols-1 md:grid-cols-2 gap-4 mt-6`} onSubmit={handleAdd}>
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Enter book title" className="mt-1 block w-full rounded-md border-stone-300 dark:border-stone-600 shadow-sm bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">Author</label>
          <input value={author} onChange={e => setAuthor(e.target.value)} type="text" placeholder="Enter author name" className="mt-1 block w-full rounded-md border-stone-300 dark:border-stone-600 shadow-sm bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">ISBN</label>
          <input value={isbn} onChange={e => setIsbn(e.target.value)} type="text" placeholder="Enter ISBN" className="mt-1 block w-full rounded-md border-stone-300 dark:border-stone-600 shadow-sm bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">Genre</label>
          <select value={genre} onChange={e => setGenre(e.target.value)} className="mt-1 block w-full rounded-md border-stone-300 dark:border-stone-600 shadow-sm bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Science</option>
            <option>History</option>
            <option>Biography</option>
          </select>
        </div>
        <div className="md:col-span-2 mt-4">
          <button type="submit" className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200">
            Add Book to Library
          </button>
        </div>
      </form>
    </div>
  );
}