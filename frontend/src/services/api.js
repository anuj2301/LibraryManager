import axios from "axios";
const API_URL = "http://localhost:8080/api";

export const getBooks = () => axios.get(`${API_URL}/books`);
export const addBook = (book) => axios.post(`${API_URL}/books`, book);
export const updateBook = (id, book) => axios.put(`${API_URL}/books/${id}`, book);
export const deleteBook = (id) => axios.delete(`${API_URL}/books/${id}`);

export const getUsers = () => axios.get(`${API_URL}/users`);
export const addUser = (user) => axios.post(`${API_URL}/users`, user);
export const borrowBook = (userId, bookId) => axios.post(`${API_URL}/users/${userId}/borrow`, { bookId });
export const returnBook = (userId, bookId) => axios.post(`${API_URL}/users/${userId}/return`, { bookId });
