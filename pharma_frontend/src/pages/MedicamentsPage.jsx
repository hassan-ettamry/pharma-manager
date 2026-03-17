import { useState, useMemo } from "react";
import { useMedicaments } from "../hooks/useMedicaments";

export default function MedicamentsPage() {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  const [nom, setNom] = useState("");
  const [dci, setDci] = useState("");

  const filters = useMemo(() => ({ search }), [search]);

  const {
    medicaments,
    loading,
    error,
    addMedicament,
    removeMedicament,
    editMedicament,
  } = useMedicaments(filters);

  const handleSubmit = async () => {
    if (!nom || !dci) return;

    if (editing) {
      await editMedicament(editing.id, { nom, dci });
      setEditing(null);
    } else {
      await addMedicament({ nom, dci });
    }

    setNom("");
    setDci("");
  };

  const handleEdit = (m) => {
    setEditing(m);
    setNom(m.nom);
    setDci(m.dci);
  };

  return (
    <div>
      <h1>Medicaments</h1>

      {/* SEARCH */}
      <input
        placeholder="Search medicament..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ERROR */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* FORM */}
      <div>
        <input
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />

        <input
          placeholder="DCI"
          value={dci}
          onChange={(e) => setDci(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {editing ? "Update Medicament" : "Add Medicament"}
        </button>
      </div>

      {/* LIST */}
      <ul>
        {medicaments.map((m) => (
          <li key={m.id}>
            {m.nom} — Stock: {m.stock_actuel}

            {/* LOW STOCK */}
            {m.stock_actuel <= m.stock_minimum && (
              <span style={{ color: "red" }}> Low Stock</span>
            )}

            {/* EDIT */}
            <button onClick={() => handleEdit(m)}>Edit</button>

            {/* DELETE */}
            <button onClick={() => removeMedicament(m.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}