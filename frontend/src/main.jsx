import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from 'axios';
import { AuthProvider } from "./context/AuthContext";

// Set the base URL for your Spring Boot backend
axios.defaults.baseURL = 'http://localhost:8080';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);