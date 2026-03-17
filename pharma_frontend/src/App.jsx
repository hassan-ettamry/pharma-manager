import { BrowserRouter, Routes, Route } from "react-router-dom";
import MedicamentsPage from "./pages/MedicamentsPage";
import VentesPage from "./pages/VentesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MedicamentsPage />} />
        <Route path="/ventes" element={<VentesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;