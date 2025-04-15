import "./styles/style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Dashboard } from "./components/dashboard/Dashboard";
import { SingleSearch } from "./components/single-search/SingleSearch";
import { Card } from "./components/dashboard/Card";
import { LoginPage } from "./components/auth/LoginPage";
import { SignUp } from "./components/auth/SignUpForm";

function App() {
  return (
    <Router>
      {/* Routing logic */}
      <Routes>
        <Route path="/single-search" element={<SingleSearch />} />

        <Route path="/" element={<Dashboard />} />
        <Route path="/gym" element={<Card />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
