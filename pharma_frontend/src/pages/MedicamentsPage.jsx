import { useState, useMemo } from "react";
import { useMedicaments } from "../hooks/useMedicaments";
import "./MedicamentsPage.css";

export default function MedicamentsPage() {
  const [search, setSearch] = useState("");
  const [categorie, setCategorie] = useState("");
  const [ordonnance, setOrdonnance] = useState("");
  const [editing, setEditing] = useState(null);

  const [nom, setNom] = useState("");
  const [dci, setDci] = useState("");

  /**
   * Fix boolean conversion
   */
  const filters = useMemo(
    () => ({
      search,
      categorie,
      ordonnance_requise:
        ordonnance === "" ? "" : ordonnance === "true",
    }),
    [search, categorie, ordonnance]
  );

  const {
    medicaments,
    alertes,
    categories,
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
    <div className="container">
      <h1>Medicaments</h1>

      {/* SEARCH */}
      <input
        className="search"
        placeholder="Search medicament..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTERS */}
      <div className="filters">
        <select
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
        >
          <option value="">All Categories</option>

          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nom}
            </option>
          ))}
        </select>

        <select
          value={ordonnance}
          onChange={(e) => setOrdonnance(e.target.value)}
        >
          <option value="">All</option>
          <option value="true">Ordonnance Required</option>
          <option value="false">No Ordonnance</option>
        </select>
      </div>

      {/* ERROR */}
      {error && <p className="error">{error}</p>}

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* ALERTES */}
      <div className="alert-box">
        <h2>Low Stock Alertes</h2>

        {alertes.length === 0 ? (
          <p>No alerts</p>
        ) : (
          <ul>
            {alertes.map((m) => (
              <li key={m.id}>
                {m.nom} — Stock: {m.stock_actuel} (Min:{" "}
                {m.stock_minimum})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* FORM */}
      <div className="form">
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
          {editing ? "Update" : "Add"}
        </button>
      </div>

      {/* LIST */}
      <ul className="list">
        {medicaments.map((m) => (
          <li key={m.id}>
            <div>
              {m.nom} — Stock: {m.stock_actuel}
              {m.stock_actuel <= m.stock_minimum && (
                <span className="low"> ⚠ Low</span>
              )}
            </div>

            <div className="actions">
              <button onClick={() => handleEdit(m)}>Edit</button>
              <button onClick={() => removeMedicament(m.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}