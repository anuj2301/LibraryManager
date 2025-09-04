import { useEffect, useState } from "react";
import { getUsers, addUser, borrowBook, returnBook, getBooks } from "../services/api";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedBook, setSelectedBook] = useState("");

  useEffect(() => {
    getUsers().then(r=>setUsers(r.data));
    getBooks().then(r=>setBooks(r.data));
  }, []);

  const add = async () => {
    const { data } = await addUser({ name, email });
    setUsers([...users, data]);
    setName(""); setEmail("");
  };

  const borrow = async (userId) => {
    if(!selectedBook) return;
    const { data } = await borrowBook(userId, selectedBook);
    setUsers(users.map(u => u.id === userId ? data : u));
  };

  const ret = async (userId, bookId) => {
    const { data } = await returnBook(userId, bookId);
    setUsers(users.map(u => u.id === userId ? data : u));
  };

  return (
    <div id="users" className="p-4">
      <h2 className="text-xl font-semibold mb-2">Users</h2>
      <div className="flex gap-2 mb-2">
        <input className="border p-2" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input className="border p-2" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <button onClick={add} className="bg-blue-600 text-white px-3 rounded">Add User</button>
      </div>
      <div className="flex gap-2 mb-3">
        <select className="border p-2" value={selectedBook} onChange={(e)=>setSelectedBook(e.target.value)}>
          <option value="">Select book to issue</option>
          {books.filter(b=>b.available).map(b=>(
            <option key={b.id} value={b.id}>{b.title}</option>
          ))}
        </select>
      </div>
      {users.map(u => (
        <div key={u.id} className="border p-3 mb-2 rounded">
          <div className="font-medium">{u.name} <span className="opacity-60">({u.email})</span></div>
          <div className="text-sm">Borrowed: {u.borrowedBooks?.length || 0}</div>
          <div className="flex gap-2 mt-2">
            <button onClick={()=>borrow(u.id)} className="px-2 border rounded">Issue Selected Book</button>
            {(u.borrowedBooks||[]).map(bid => (
              <button key={bid} onClick={()=>ret(u.id, bid)} className="px-2 border rounded">Return {bid.slice(-4)}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
