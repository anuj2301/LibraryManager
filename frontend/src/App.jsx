import { useState, useEffect } from "react";
import { BookOpen, Users, Plus, Search, Menu, X, Sun, Moon } from "lucide-react";
import axios from "axios";

// Main App Component with Theme Context
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // data states
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  // Apply global styles when component mounts
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
      document.body.style.lineHeight = '1.6';
      document.body.style.boxSizing = 'border-box';
      
      // Apply box-sizing to all elements
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          box-sizing: border-box;
        }
      `;
      document.head.appendChild(style);
    }

    // initial load
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

  const appStyle = {
    minHeight: '100vh',
    backgroundColor: isDarkMode ? '#1c1917' : '#fafaf9',
    color: isDarkMode ? '#f5f5f4' : '#1c1917',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={appStyle}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '8px',
            color: isDarkMode ? '#f5f5f4' : '#1c1917'
          }}>
            Welcome to Athenaeum
          </h1>
          <p style={{ 
            fontSize: '1.125rem',
            color: isDarkMode ? '#a8a29e' : '#57534e'
          }}>
            Your comprehensive library management solution
          </p>
        </div>

        {/* NOTE: BookForm, BookList, UserList receive props to call APIs */}
        <BookForm isDarkMode={isDarkMode} onAdded={() => fetchBooks()} />
        <BookList isDarkMode={isDarkMode} books={books} onDelete={async (id) => {
          try { await axios.delete(`/api/books/${id}`); fetchBooks(); }
          catch(e){ console.error(e); alert("Delete failed"); }
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

// ---------------- Navbar Component ----------------
function Navbar({ isDarkMode, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navStyle = {
    background: isDarkMode 
      ? 'linear-gradient(to right, #1c1917, #292524)' 
      : 'linear-gradient(to right, #292524, #44403c)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    borderBottom: `2px solid ${isDarkMode ? '#44403c' : '#57534e'}`,
    transition: 'all 0.3s ease'
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 16px'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#f5f5f4',
    letterSpacing: '0.05em'
  };

  const subtitleStyle = {
    fontSize: '0.875rem',
    color: '#d6d3d1'
  };

  const navLinksStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  };

  const linkStyle = {
    color: '#e7e5e4',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  };

  const buttonStyle = {
    padding: '8px',
    borderRadius: '8px',
    backgroundColor: isDarkMode ? '#44403c' : '#57534e',
    color: '#e7e5e4',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const mobileMenuStyle = {
    display: isMenuOpen ? 'block' : 'none',
    paddingBottom: '16px'
  };

  const mobileLinksStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <div style={logoStyle}>
            <BookOpen size={32} color="#e7e5e4" />
            <span style={titleStyle}>Athenaeum</span>
            <span style={{ ...subtitleStyle, display: window.innerWidth < 640 ? 'none' : 'block' }}>
              Library Management
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div style={{ ...navLinksStyle, display: window.innerWidth < 768 ? 'none' : 'flex' }}>
            <a href="#books" style={linkStyle}>Books</a>
            <a href="#users" style={linkStyle}>Users</a>
            <a href="#reports" style={linkStyle}>Reports</a>
            
            <button onClick={toggleTheme} style={buttonStyle}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div style={{ display: window.innerWidth < 768 ? 'flex' : 'none', alignItems: 'center', gap: '8px' }}>
            <button onClick={toggleTheme} style={buttonStyle}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={buttonStyle}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div style={mobileMenuStyle}>
          <div style={mobileLinksStyle}>
            <a href="#books" style={linkStyle}>Books</a>
            <a href="#users" style={linkStyle}>Users</a>
            <a href="#reports" style={linkStyle}>Reports</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ---------------- BookForm Component (now wired to backend) ----------------
function BookForm({ isDarkMode, onAdded }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [genre, setGenre] = useState("Fiction");

  const containerStyle = {
    backgroundColor: isDarkMode ? '#292524' : '#f5f5f4',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${isDarkMode ? '#44403c' : '#e7e5e4'}`,
    padding: '24px',
    marginBottom: '32px',
    transition: 'all 0.3s ease'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  };

  const titleContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: isDarkMode ? '#f5f5f4' : '#1c1917'
  };

  const buttonStyle = {
    backgroundColor: isDarkMode ? '#57534e' : '#44403c',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  };

  const formStyle = {
    display: isExpanded ? 'grid' : 'none',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px',
    marginTop: '24px'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 16px',
    border: `1px solid ${isDarkMode ? '#57534e' : '#d6d3d1'}`,
    borderRadius: '8px',
    backgroundColor: isDarkMode ? '#44403c' : 'white',
    color: isDarkMode ? '#f5f5f4' : '#1c1917',
    fontSize: '1rem',
    transition: 'all 0.2s ease'
  };

  const submitButtonStyle = {
    ...buttonStyle,
    gridColumn: '1 / -1',
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: '600'
  };

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
    <div style={containerStyle} id="books">
      <div style={headerStyle}>
        <div style={titleContainerStyle}>
          <Plus size={24} color={isDarkMode ? '#d6d3d1' : '#44403c'} />
          <h2 style={titleStyle}>Add New Book</h2>
        </div>
        <button onClick={() => setIsExpanded(!isExpanded)} style={buttonStyle}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      
      <form style={formStyle} onSubmit={handleAdd}>
        <div>
          <label style={{display:'block', marginBottom:8, color: isDarkMode ? '#d6d3d1' : '#44403c'}}>Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} type="text" placeholder="Enter book title" style={inputStyle} required />
        </div>
        <div>
          <label style={{display:'block', marginBottom:8, color: isDarkMode ? '#d6d3d1' : '#44403c'}}>Author</label>
          <input value={author} onChange={e=>setAuthor(e.target.value)} type="text" placeholder="Enter author name" style={inputStyle} required />
        </div>
        <div>
          <label style={{display:'block', marginBottom:8, color: isDarkMode ? '#d6d3d1' : '#44403c'}}>ISBN</label>
          <input value={isbn} onChange={e=>setIsbn(e.target.value)} type="text" placeholder="Enter ISBN" style={inputStyle} />
        </div>
        <div>
          <label style={{display:'block', marginBottom:8, color: isDarkMode ? '#d6d3d1' : '#44403c'}}>Genre</label>
          <select value={genre} onChange={e=>setGenre(e.target.value)} style={inputStyle}>
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Science</option>
            <option>History</option>
            <option>Biography</option>
          </select>
        </div>
        <button type="submit" style={submitButtonStyle}>Add Book to Library</button>
      </form>
    </div>
  );
}

// ---------------- BookList Component (wired to backend via props) ----------------
function BookList({ isDarkMode, books = [], onDelete, onToggle }) {
  const [searchTerm, setSearchTerm] = useState('');

  const containerStyle = {
    backgroundColor: isDarkMode ? '#292524' : '#f5f5f4',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${isDarkMode ? '#44403c' : '#e7e5e4'}`,
    padding: '24px',
    marginBottom: '32px',
    transition: 'all 0.3s ease'
  };

  // filter locally
  const filtered = books.filter(b => {
    const q = searchTerm.toLowerCase();
    return !q || (b.title && b.title.toLowerCase().includes(q)) || (b.author && b.author.toLowerCase().includes(q)) || (b.isbn && b.isbn.toLowerCase().includes(q));
  });

  return (
    <div style={containerStyle}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24}}>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <BookOpen size={24} color={isDarkMode ? '#d6d3d1' : '#44403c'} />
          <h2 style={{fontSize:'1.5rem', fontWeight:'bold', color: isDarkMode ? '#f5f5f4' : '#1c1917'}}>Library Collection</h2>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:8, backgroundColor: isDarkMode ? '#44403c' : 'white', border: `1px solid ${isDarkMode ? '#57534e' : '#d6d3d1'}`, borderRadius:8, padding:'8px 12px'}}>
          <Search size={20} color={isDarkMode ? '#a8a29e' : '#57534e'} />
          <input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} placeholder="Search books..." style={{border:'none', outline:'none', background:'transparent', color: isDarkMode ? '#f5f5f4' : '#1c1917'}} />
        </div>
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:16}}>
        {filtered.map((book) => (
          <div key={book.id} style={{backgroundColor:isDarkMode? '#44403c':'white', border:`1px solid ${isDarkMode? '#57534e':'#e7e5e4'}`, borderRadius:8, padding:16}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16}}>
              <div style={{flex:'1', minWidth:200}}>
                <h3 style={{fontSize:'1.125rem', fontWeight:600, marginBottom:4, color: isDarkMode ? '#f5f5f4' : '#1c1917'}}>{book.title}</h3>
                <p style={{color: isDarkMode ? '#d6d3d1' : '#57534e', marginBottom:8}}>by {book.author}</p>
                <div style={{display:'flex', flexWrap:'wrap', gap:8, fontSize:14}}>
                  <span style={{backgroundColor:isDarkMode? '#57534e':'#e7e5e4', color:isDarkMode? '#e7e5e4':'#1c1917', padding:'4px 8px', borderRadius:4}}>{book.genre || ''}</span>
                  <span style={{color:isDarkMode? '#a8a29e' : '#57534e'}}>ISBN: {book.isbn || '-'}</span>
                </div>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:12, flexWrap:'wrap'}}>
                <span style={{
                  padding:'4px 12px', borderRadius:20, fontSize:14, fontWeight:500,
                  backgroundColor: book.available ? (isDarkMode? '#14532d':'#dcfce7') : (isDarkMode? '#7f1d1d' : '#fecaca'),
                  color: book.available ? (isDarkMode? '#bbf7d0':'#166534') : (isDarkMode? '#fca5a5' : '#dc2626')
                }}>{book.available ? 'Available' : 'Issued'}</span>

                <button onClick={() => onToggle?.(book)} style={{backgroundColor:isDarkMode? '#78716c':'#57534e', color:'white', padding:'8px 16px', borderRadius:8, border:'none', cursor:'pointer'}}>Toggle</button>

                <button onClick={() => onDelete?.(book.id)} style={{backgroundColor:'#b91c1c', color:'white', padding:'8px 16px', borderRadius:8, border:'none', cursor:'pointer'}}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- UserList Component (wired to backend) ----------------
function UserList({ isDarkMode, users = [], onAdded, onBorrow, onReturn, availableBooks = [] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedBook, setSelectedBook] = useState("");

  const containerStyle = {
    backgroundColor: isDarkMode ? '#292524' : '#f5f5f4',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${isDarkMode ? '#44403c' : '#e7e5e4'}`,
    padding: '24px',
    transition: 'all 0.3s ease'
  };

  const addUser = async () => {
    if(!name || !email) { alert("Fill name & email"); return; }
    try {
      await axios.post("/api/users", { name, email });
      setName(""); setEmail("");
      onAdded?.();
      alert("User added");
    } catch (e) { console.error(e); alert("Failed to add user"); }
  };

  return (
    <div style={containerStyle} id="users">
      <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:16}}>
        <Users size={24} color={isDarkMode ? '#d6d3d1' : '#44403c'} />
        <h2 style={{fontSize:'1.5rem', fontWeight:'bold', color: isDarkMode ? '#f5f5f4' : '#1c1917'}}>Library Members</h2>
      </div>

      <div style={{display:'flex', gap:8, marginBottom:12}}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" style={{padding:8, borderRadius:8, border:`1px solid ${isDarkMode? '#57534e':'#d6d3d1'}`, backgroundColor:isDarkMode? '#44403c':'white', color:isDarkMode? '#f5f5f4':'#1c1917'}}/>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{padding:8, borderRadius:8, border:`1px solid ${isDarkMode? '#57534e':'#d6d3d1'}`, backgroundColor:isDarkMode? '#44403c':'white', color:isDarkMode? '#f5f5f4':'#1c1917'}}/>
        <button onClick={addUser} style={{backgroundColor:'#2563eb', color:'white', padding:'8px 12px', borderRadius:8}}>Add User</button>
      </div>

      <div style={{display:'flex', gap:8, marginBottom:18}}>
        <select value={selectedBook} onChange={e=>setSelectedBook(e.target.value)} style={{padding:8, borderRadius:8, border:`1px solid ${isDarkMode? '#57534e':'#d6d3d1'}`, backgroundColor:isDarkMode? '#44403c':'white', color:isDarkMode? '#f5f5f4':'#1c1917'}}>
          <option value="">Select book to issue</option>
          {availableBooks.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
        </select>
      </div>

      {users.map(u => (
        <div key={u.id} style={{border:'1px solid', borderColor: isDarkMode? '#57534e':'#e7e5e4', borderRadius:8, padding:12, marginBottom:8, backgroundColor:isDarkMode? '#44403c':'white'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div style={{fontWeight:600, color:isDarkMode? '#f5f5f4':'#1c1917'}}>{u.name} <span style={{color:isDarkMode? '#a8a29e':'#57534e'}}>({u.email})</span></div>
              <div style={{fontSize:12, color:isDarkMode? '#a8a29e':'#57534e'}}>Borrowed: {(u.borrowedBooks||[]).length}</div>
            </div>
            <div style={{display:'flex', gap:8}}>
              <button onClick={() => {
                if(!selectedBook) return alert("Select a book first");
                onBorrow?.(u.id, selectedBook);
              }} style={{padding:'8px 12px', borderRadius:8, backgroundColor:'#10b981', color:'white'}}>Issue Selected Book</button>

              {(u.borrowedBooks||[]).map(bid => (
                <button key={bid} onClick={() => onReturn?.(u.id, bid)} style={{padding:'8px 12px', borderRadius:8, backgroundColor:'#f97316', color:'white'}}>
                  Return {String(bid).slice(-4)}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
