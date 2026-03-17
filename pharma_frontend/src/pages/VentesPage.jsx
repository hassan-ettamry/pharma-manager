import { useState } from "react";
import { useVentes } from "../hooks/useVentes";
import { useMedicaments } from "../hooks/useMedicaments";

/**
 * Sales page
 * - Create a sale
 * - List sales
 * - Cancel sale
 */
export default function VentesPage() {
  const { ventes, addVente, annulerVente, loading } = useVentes();
  const { medicaments } = useMedicaments();

  const [medicamentId, setMedicamentId] = useState("");
  const [quantite, setQuantite] = useState(1);

  /**
   * Handle sale creation
   */
  const handleCreate = async () => {
    // validation
    if (!medicamentId) {
      alert("Please select a medicament");
      return;
    }

    // get selected medicament (for price)
    const selected = medicaments.find(
      (m) => m.id === Number(medicamentId)
    );

    const prix = selected?.prix_vente || 0;

    await addVente({
      reference: "V-" + Date.now(),
      notes: "Test sale",
      lignes: [
        {
          medicament: Number(medicamentId),
          quantite: Number(quantite),
          prix_unitaire: prix,
        },
      ],
    });

    // reset form
    setMedicamentId("");
    setQuantite(1);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Sales</h1>

      {/* Create sale */}
      <div>
        <h3>Create Sale</h3>

        {/* Medicament selection */}
        <select
          value={medicamentId}
          onChange={(e) => setMedicamentId(e.target.value)}
        >
          <option value="">Select Medicament</option>

          {medicaments.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nom} (Stock: {m.stock_actuel})
            </option>
          ))}
        </select>

        {/* Quantity */}
        <input
          type="number"
          min="1"
          value={quantite}
          onChange={(e) => setQuantite(e.target.value)}
        />

        {/* Create button */}
        <button onClick={handleCreate}>Create Sale</button>
      </div>

      {/* Sales list */}
      <div>
        <h3>Sales List</h3>

        {ventes.map((v) => (
          <div key={v.id} style={{ marginBottom: "10px" }}>
            <p>
              Ref: {v.reference} — Status: {v.statut}
            </p>

            {/* Cancel button */}
            {v.statut !== "ANNULEE" && (
              <button onClick={() => annulerVente(v.id)}>
                Cancel Sale
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}