import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* UNPROTECTED ROUTES */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          {/* PROTECTED ROUTE */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
