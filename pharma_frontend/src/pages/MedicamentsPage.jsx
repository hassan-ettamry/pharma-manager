import { useMedicaments } from "../hooks/useMedicaments";
import MedicamentForm from "../components/medicaments/MedicamentForm";

/**
 * Medicaments main page
 */
export default function MedicamentsPage() {
  const {
    medicaments,
    loading,
    error,
    addMedicament,
    removeMedicament,
  } = useMedicaments();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Medicaments</h1>

      {/* Error message */}
      {error && (
        <div
          style={{
            background: "#ffe0e0",
            color: "#900",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
          }}
        >
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Form */}
      <MedicamentForm onAdd={addMedicament} />

      {/* Empty state */}
      {!loading && medicaments.length === 0 && (
        <p>No medicaments found</p>
      )}

      {/* List */}
      <div style={{ marginTop: "20px" }}>
        {medicaments.map((med) => (
          <div
            key={med.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>
              <strong>{med.nom}</strong> — Stock: {med.stock_actuel}
              
              {/* LOW STOCK INDICATOR */}
              {med.stock_actuel <= med.stock_minimum && (
                <span style={{ color: "red", marginLeft: "10px" }}>
                  ⚠ Low Stock
                </span>
              )}
            </p>

            <button
              onClick={() => removeMedicament(med.id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}