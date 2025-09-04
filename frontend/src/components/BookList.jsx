import { useEffect, useState } from "react";
import { getBooks, deleteBook, updateBook } from "../services/api";

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => { getBooks().then(res => setBooks(res.data)); }, []);

  const remove = async (id) => {
    await deleteBook(id);
    setBooks(books.filter(b => b.id !== id));
  };

  const toggleAvail = async (b) => {
    const updated = { ...b, available: !b.available };
    const { data } = await updateBook(b.id, updated);
    setBooks(books.map(x => x.id === b.id ? data : x));
  };

  return (
    <div id="books" className="p-4">
      <h2 className="text-xl font-semibold mb-2">Books</h2>
      {books.map(b => (
        <div key={b.id} className="flex items-center gap-3 py-1">
          <span className="w-64">{b.title}</span>
          <span className="w-48 opacity-80">{b.author}</span>
          <span className="w-36 opacity-60">{b.isbn}</span>
          <span className="w-24">{b.available ? "Available" : "Issued"}</span>
          <button onClick={()=>toggleAvail(b)} className="px-2 border rounded">Toggle</button>
          <button onClick={()=>remove(b.id)} className="px-2 border rounded">Delete</button>
        </div>
      ))}
    </div>
  );
}
