import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PassivePage from "./pages/passive";
import RetirePage from "./pages/retire";
import TablePage from "./pages/table";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RetirePage />} />
        <Route path="/passive" element={<PassivePage />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
