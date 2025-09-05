import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("/api/books")
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`);
      setBooks(books.filter(b => b.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Books</h1>
      <ul>
        {books.map(book => (
          <li key={book.id} className="flex justify-between">
            {book.title} — {book.author}
            <button onClick={() => handleDelete(book.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
