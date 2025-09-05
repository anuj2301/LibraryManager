import React, { useState } from "react";
import axios from "axios";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users", { name, email });
      alert("User added successfully!");
      setName("");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Error adding user");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Add User</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input
          type="text"
          placeholder="User Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
        <input
          type="email"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">
          Add User
        </button>
      </form>
    </div>
  );
}
