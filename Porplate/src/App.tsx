import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Principal from "./pages/principal";
import Admin from "./pages/admin";
import "./style/style.css";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Portfolio</Link> | <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}