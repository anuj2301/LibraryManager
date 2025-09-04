export default function Navbar() {
  return (
    <nav className="p-4 shadow flex gap-4">
      <span className="font-bold">Library Manager</span>
      <a href="#books">Books</a>
      <a href="#users">Users</a>
    </nav>
  );
}
