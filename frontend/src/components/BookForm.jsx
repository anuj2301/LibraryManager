import { useState } from "react";
import { addBook } from "../services/api";

export default function BookForm({ onAdd }) {
  const [form, setForm] = useState({ title: "", author: "", isbn: "" });

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await addBook(form);
    onAdd?.(data);
    setForm({ title: "", author: "", isbn: "" });
  };

  return (
    <form onSubmit={submit} className="flex gap-2 p-2">
      <input className="border p-2" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} />
      <input className="border p-2" placeholder="Author" value={form.author} onChange={(e)=>setForm({...form, author:e.target.value})} />
      <input className="border p-2" placeholder="ISBN" value={form.isbn} onChange={(e)=>setForm({...form, isbn:e.target.value})} />
      <button className="bg-blue-600 text-white px-3 rounded">Add</button>
    </form>
  );
}
