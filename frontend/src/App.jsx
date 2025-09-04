import Navbar from "./components/Navbar";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import UserList from "./components/UserList";

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <BookForm />
        <BookList />
        <UserList />
      </div>
    </div>
  );
}
