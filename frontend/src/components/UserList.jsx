import { Users } from "lucide-react"
import { useState } from 'react'
import axios from 'axios'

// ---------------- UserList Component ----------------
function UserList({ isDarkMode, users = [], onAdded, onBorrow, onReturn, availableBooks = [] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedBook, setSelectedBook] = useState("");

  const addUser = async () => {
    if (!name || !email) { alert("Fill name & email"); return; }
    try {
      await axios.post("/api/users", { name, email });
      setName(""); setEmail("");
      onAdded?.();
      alert("User added");
    } catch (e) { console.error(e); alert("Failed to add user"); }
  };

  return (
    <div className="bg-white dark:bg-stone-800 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 p-6 transition-colors duration-300" id="users">
      <div className="flex items-center space-x-3 mb-4">
        <Users size={24} className="text-primary-500" />
        <h2 className="text-2xl font-bold text-stone-800 dark:text-white">Library Members</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="p-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="p-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100" />
        <button onClick={addUser} className="p-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors duration-200">Add User</button>
      </div>

      <div className="mb-6">
        <select value={selectedBook} onChange={e => setSelectedBook(e.target.value)} className="w-full p-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100">
          <option value="">Select book to issue</option>
          {availableBooks.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
        </select>
      </div>

      <div className="space-y-4">
        {users.map(u => (
          <div key={u.id} className="bg-stone-50 dark:bg-stone-700 rounded-lg p-4 border border-stone-200 dark:border-stone-600 transition-colors duration-300">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <div className="flex-1">
                <div className="font-semibold text-stone-900 dark:text-white">{u.name} <span className="text-stone-500 dark:text-stone-400 font-normal">({u.email})</span></div>
                <div className="text-sm text-stone-500 dark:text-stone-400">Borrowed: {(u.borrowedBooks || []).length}</div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    if (!selectedBook) return alert("Select a book first");
                    onBorrow?.(u.id, selectedBook);
                  }}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 text-sm"
                >
                  Issue Book
                </button>

                {(u.borrowedBooks || []).map(bid => (
                  <button key={bid} onClick={() => onReturn?.(u.id, bid)} className="px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors duration-200 text-sm">
                    Return {String(bid).slice(-4)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;