import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import BookForm from "./components/Bookform";
import BookList from "./components/BookList";
import UserList from "./components/UserList";

// Main App Component with Theme Context
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // data states
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  // Initial data load and theme setup
  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // API helpers
  const fetchBooks = async () => {
    try {
      const res = await axios.get("/api/books");
      setBooks(res.data || []);
    } catch (err) {
      console.error("Failed to fetch books:", err);
      setBooks([]);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setUsers([]);
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark bg-stone-900 text-stone-50' : 'bg-stone-50 text-stone-900'} min-h-screen transition-colors duration-300`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold mb-2 text-primary-600">
            Welcome to Athenaeum
          </h1>
          <p className="text-lg text-secondary-400">
            Your comprehensive library management solution
          </p>
        </div>

        {/* NOTE: BookForm, BookList, UserList receive props to call APIs */}
        <BookForm isDarkMode={isDarkMode} onAdded={() => fetchBooks()} />
        <BookList isDarkMode={isDarkMode} books={books} onDelete={async (id) => {
          try { await axios.delete(`/api/books/${id}`); fetchBooks(); }
          catch (e) { console.error(e); alert("Delete failed"); }
        }} onToggle={async (book) => {
          try {
            const payload = { ...book, available: !book.available };
            await axios.put(`/api/books/${book.id}`, payload);
            fetchBooks();
          } catch (e) { console.error(e); alert("Update failed"); }
        }} />

        <UserList isDarkMode={isDarkMode} users={users}
          onAdded={() => fetchUsers()}
          onBorrow={async (userId, bookId) => {
            try {
              await axios.post(`/api/users/${userId}/borrow`, { bookId });
              // refresh both lists
              fetchUsers(); fetchBooks();
            } catch (e) { console.error(e); alert("Borrow failed"); }
          }}
          onReturn={async (userId, bookId) => {
            try {
              await axios.post(`/api/users/${userId}/return`, { bookId });
              fetchUsers(); fetchBooks();
            } catch (e) { console.error(e); alert("Return failed"); }
          }}
          availableBooks={books.filter(b => b.available)}
        />
      </div>
    </div>
  );
}