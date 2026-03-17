import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import MedicamentsPage from "./pages/MedicamentsPage";
import VentesPage from "./pages/VentesPage";

function App() {
  return (
    <BrowserRouter>

      {/* Navigation */}
      <nav>
        <Link to="/">Dashboard</Link> |{" "}
        <Link to="/medicaments">Medicaments</Link> |{" "}
        <Link to="/ventes">Ventes</Link>
      </nav>

      {/* Pages */}
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/medicaments" element={<MedicamentsPage />} />
        <Route path="/ventes" element={<VentesPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;