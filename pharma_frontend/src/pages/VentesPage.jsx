import { useState } from "react";
import { useMedicaments } from "../hooks/useMedicaments";

/**
 * Form to create a vente (sale)
 */
export default function VenteForm({ onAdd }) {
  const { medicaments, loading } = useMedicaments();

  const [medicamentId, setMedicamentId] = useState("");
  const [quantite, setQuantite] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!medicamentId || !quantite) {
      alert("Please fill all fields");
      return;
    }

    onAdd({
      medicament_id: Number(medicamentId),
      quantite: Number(quantite),
    });

    // reset form
    setMedicamentId("");
    setQuantite("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Vente</h2>

      {/* Medicament Select */}
      {loading ? (
        <p>Loading medicaments...</p>
      ) : (
        <select
          value={medicamentId}
          onChange={(e) => setMedicamentId(e.target.value)}
        >
          <option value="">Select Medicament</option>

          {medicaments.length === 0 ? (
            <option disabled>No medicaments available</option>
          ) : (
            medicaments.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nom} (Stock: {m.stock_actuel})
              </option>
            ))
          )}
        </select>
      )}

      {/* Quantity */}
      <input
        type="number"
        placeholder="Quantity"
        value={quantite}
        onChange={(e) => setQuantite(e.target.value)}
      />

      {/* Submit */}
      <button type="submit">Add Vente</button>
    </form>
  );
}