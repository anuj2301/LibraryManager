import { useState, useEffect } from "react";
import { BookOpen, Users, Plus, Search, Menu, X, Sun, Moon } from "lucide-react";

// Main App Component with Theme Context
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
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

// BookForm Component
function BookForm({ isDarkMode }) {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const labelStyle = {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: isDarkMode ? '#d6d3d1' : '#44403c',
    marginBottom: '8px'
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

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={titleContainerStyle}>
          <Plus size={24} color={isDarkMode ? '#d6d3d1' : '#44403c'} />
          <h2 style={titleStyle}>Add New Book</h2>
        </div>
        <button onClick={() => setIsExpanded(!isExpanded)} style={buttonStyle}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      
      <div style={formStyle}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Title</label>
          <input type="text" placeholder="Enter book title" style={inputStyle} />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Author</label>
          <input type="text" placeholder="Enter author name" style={inputStyle} />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>ISBN</label>
          <input type="text" placeholder="Enter ISBN" style={inputStyle} />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Genre</label>
          <select style={inputStyle}>
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Science</option>
            <option>History</option>
            <option>Biography</option>
          </select>
        </div>
        <button style={submitButtonStyle}>
          Add Book to Library
        </button>
      </div>
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
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px'
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

  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: isDarkMode ? '#44403c' : 'white',
    border: `1px solid ${isDarkMode ? '#57534e' : '#d6d3d1'}`,
    borderRadius: '8px',
    padding: '8px 12px'
  };

  const searchInputStyle = {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: isDarkMode ? '#f5f5f4' : '#1c1917',
    fontSize: '1rem'
  };

  const booksGridStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const bookCardStyle = {
    backgroundColor: isDarkMode ? '#44403c' : 'white',
    border: `1px solid ${isDarkMode ? '#57534e' : '#e7e5e4'}`,
    borderRadius: '8px',
    padding: '16px',
    transition: 'all 0.2s ease'
  };

  const bookHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '16px'
  };

  const bookInfoStyle = {
    flex: '1',
    minWidth: '200px'
  };

  const bookTitleStyle = {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: isDarkMode ? '#f5f5f4' : '#1c1917',
    marginBottom: '4px'
  };

  const bookAuthorStyle = {
    color: isDarkMode ? '#d6d3d1' : '#57534e',
    marginBottom: '8px'
  };

  const bookMetaStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    fontSize: '0.875rem'
  };

  const genreTagStyle = {
    backgroundColor: isDarkMode ? '#57534e' : '#e7e5e4',
    color: isDarkMode ? '#e7e5e4' : '#1c1917',
    padding: '4px 8px',
    borderRadius: '4px'
  };

  const bookActionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap'
  };

  const statusStyle = (status) => ({
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '500',
    backgroundColor: status === 'Available' 
      ? isDarkMode ? '#14532d' : '#dcfce7' 
      : isDarkMode ? '#7f1d1d' : '#fecaca',
    color: status === 'Available' 
      ? isDarkMode ? '#bbf7d0' : '#166534' 
      : isDarkMode ? '#fca5a5' : '#dc2626'
  });

  const actionButtonStyle = {
    backgroundColor: isDarkMode ? '#78716c' : '#57534e',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={titleContainerStyle}>
          <BookOpen size={24} color={isDarkMode ? '#d6d3d1' : '#44403c'} />
          <h2 style={titleStyle}>Library Collection</h2>
        </div>
        <div style={searchContainerStyle}>
          <Search size={20} color={isDarkMode ? '#a8a29e' : '#57534e'} />
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
          />
        </div>
      </div>

      <div style={booksGridStyle}>
        {mockBooks.map((book) => (
          <div key={book.id} style={bookCardStyle}>
            <div style={bookHeaderStyle}>
              <div style={bookInfoStyle}>
                <h3 style={bookTitleStyle}>{book.title}</h3>
                <p style={bookAuthorStyle}>by {book.author}</p>
                <div style={bookMetaStyle}>
                  <span style={genreTagStyle}>{book.genre}</span>
                  <span style={{ color: isDarkMode ? '#a8a29e' : '#57534e' }}>
                    ISBN: {book.isbn}
                  </span>
                </div>
              </div>
              <div style={bookActionsStyle}>
                <span style={statusStyle(book.status)}>{book.status}</span>
                <button style={actionButtonStyle}>
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

  const containerStyle = {
    backgroundColor: isDarkMode ? '#292524' : '#f5f5f4',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${isDarkMode ? '#44403c' : '#e7e5e4'}`,
    padding: '24px',
    transition: 'all 0.3s ease'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: isDarkMode ? '#f5f5f4' : '#1c1917'
  };

  const usersGridStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const userCardStyle = {
    backgroundColor: isDarkMode ? '#44403c' : 'white',
    border: `1px solid ${isDarkMode ? '#57534e' : '#e7e5e4'}`,
    borderRadius: '8px',
    padding: '16px',
    transition: 'all 0.2s ease'
  };

  const userHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '16px'
  };

  const userInfoStyle = {
    flex: '1',
    minWidth: '200px'
  };

  const userNameStyle = {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: isDarkMode ? '#f5f5f4' : '#1c1917',
    marginBottom: '4px'
  };

  const userEmailStyle = {
    color: isDarkMode ? '#d6d3d1' : '#57534e',
    marginBottom: '8px'
  };

  const memberSinceStyle = {
    fontSize: '0.875rem',
    color: isDarkMode ? '#a8a29e' : '#78716c'
  };

  const userActionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap'
  };

  const statsStyle = {
    textAlign: 'center'
  };

  const statNumberStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: isDarkMode ? '#f5f5f4' : '#1c1917'
  };

  const statLabelStyle = {
    fontSize: '0.75rem',
    color: isDarkMode ? '#a8a29e' : '#57534e'
  };

  const actionButtonStyle = {
    backgroundColor: isDarkMode ? '#78716c' : '#57534e',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <Users size={24} color={isDarkMode ? '#d6d3d1' : '#44403c'} />
        <h2 style={titleStyle}>Library Members</h2>
      </div>

      <div style={usersGridStyle}>
        {mockUsers.map((user) => (
          <div key={user.id} style={userCardStyle}>
            <div style={userHeaderStyle}>
              <div style={userInfoStyle}>
                <h3 style={userNameStyle}>{user.name}</h3>
                <p style={userEmailStyle}>{user.email}</p>
                <p style={memberSinceStyle}>Member since: {user.memberSince}</p>
              </div>
              <div style={userActionsStyle}>
                <div style={statsStyle}>
                  <div style={statNumberStyle}>{user.booksCheckedOut}</div>
                  <div style={statLabelStyle}>Books Out</div>
                </div>
                <button style={actionButtonStyle}>
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