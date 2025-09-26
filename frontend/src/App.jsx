import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import BookForm from "./components/Bookform";
import BookList from "./components/BookList";
import UserList from "./components/UserList";
import LoginForm from "./components/LoginForm";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/useAuth";

// Main App Content (authenticated part)
function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const { isAuthenticated, loading, user } = useAuth();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // API helpers
  const fetchBooks = async () => {
    try {
      let res;
      if (user?.mode === 'student') {
        res = await axios.get("/api/books/available");
      } else {
        res = await axios.get("/api/books");
      }
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

  // Initial data load and theme setup
  useEffect(() => {
    if (isAuthenticated) {
      fetchBooks();
      fetchUsers();
    }
  }, [isAuthenticated]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <LoginForm isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
  }

  // Show main app if authenticated
  return (
    <div className={`${isDarkMode ? 'dark bg-stone-900 text-stone-50' : 'bg-stone-50 text-stone-900'} min-h-screen transition-colors duration-300`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold mb-2 text-indigo-600">
            Welcome to Athenaeum
          </h1>
          <p className="text-lg text-stone-500">
            Your comprehensive library management solution
          </p>
        </div>

        {/* If student, show only book list. If librarian, show full dashboard. */}
        {user?.mode === 'student' ? (
          <BookList isDarkMode={isDarkMode} books={books} />
        ) : (
          <>
            <BookForm isDarkMode={isDarkMode} onAdded={() => fetchBooks()} />
            <BookList 
              isDarkMode={isDarkMode} 
              books={books} 
              onDelete={async (id) => {
                try { 
                  await axios.delete(`/api/books/${id}`); 
                  fetchBooks(); 
                } catch (e) { 
                  console.error(e); 
                  alert("Delete failed"); 
                }
              }} 
              onToggle={async (book) => {
                try {
                  const payload = { ...book, available: !book.available };
                  await axios.put(`/api/books/${book.id}`, payload);
                  fetchBooks();
                } catch (e) { 
                  console.error(e); 
                  alert("Update failed"); 
                }
              }} 
            />
            <UserList 
              isDarkMode={isDarkMode} 
              users={users}
              onAdded={() => fetchUsers()}
              onBorrow={async (userId, bookId) => {
                try {
                  await axios.post(`/api/users/${userId}/borrow`, { bookId });
                  fetchUsers(); 
                  fetchBooks();
                } catch (e) { 
                  console.error(e); 
                  alert("Borrow failed"); 
                }
              }}
              onReturn={async (userId, bookId) => {
                try {
                  await axios.post(`/api/users/${userId}/return`, { bookId });
                  fetchUsers(); 
                  fetchBooks();
                } catch (e) { 
                  console.error(e); 
                  alert("Return failed"); 
                }
              }}
              availableBooks={books.filter(b => b.available)}
            />
          </>
        )}
      </div>
    </div>
  );
}

// Main App with Auth Provider
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}