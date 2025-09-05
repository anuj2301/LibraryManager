import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BorrowReturn() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedBook, setSelectedBook] = useState("");

  useEffect(() => {
    axios.get("/api/users").then(res => setUsers(res.data));
    axios.get("/api/books").then(res => setBooks(res.data));
  }, []);

  const borrowBook = async () => {
    try {
      await axios.post(`/api/users/${selectedUser}/borrow`, { bookId: selectedBook });
      alert("Book borrowed!");
    } catch (err) {
      console.error(err);
      alert("Error borrowing book");
    }
  };

  const returnBook = async () => {
    try {
      await axios.post(`/api/users/${selectedUser}/return`, { bookId: selectedBook });
      alert("Book returned!");
    } catch (err) {
      console.error(err);
      alert("Error returning book");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Borrow / Return</h1>
      <div className="flex gap-2">
        <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
          <option value="">Select User</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>

        <select onChange={(e) => setSelectedBook(e.target.value)} value={selectedBook}>
          <option value="">Select Book</option>
          {books.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
        </select>

        <button onClick={borrowBook} className="bg-green-500 text-white px-2 py-1 rounded">Borrow</button>
        <button onClick={returnBook} className="bg-blue-500 text-white px-2 py-1 rounded">Return</button>
      </div>
    </div>
  );
}
