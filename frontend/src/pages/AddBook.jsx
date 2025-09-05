import React, { useState } from "react";
import axios from "axios";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/books", { title, author });
      alert("Book added successfully!");
      setTitle("");
      setAuthor("");
    } catch (err) {
      console.error(err);
      alert("Error adding book");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Add Book</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">
          Add Book
        </button>
      </form>
    </div>
  );
}
