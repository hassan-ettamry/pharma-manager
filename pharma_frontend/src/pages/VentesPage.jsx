import { useState } from "react";
import { useVentes } from "../hooks/useVentes";

/**
 * Sales page
 */
export default function VentesPage() {
  const { ventes, addVente, annulerVente, loading } = useVentes();

  const [medicamentId, setMedicamentId] = useState("");
  const [quantite, setQuantite] = useState(1);

  const handleCreate = async () => {
    await addVente({
      reference: "V-" + Date.now(),
      notes: "Test sale",
      lignes: [
        {
          medicament: Number(medicamentId),
          quantite: Number(quantite),
          prix_unitaire: 10,
        },
      ],
    });

    setMedicamentId("");
    setQuantite(1);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Sales</h1>

      {/* Create sale */}
      <div>
        <input
          placeholder="Medicament ID"
          value={medicamentId}
          onChange={(e) => setMedicamentId(e.target.value)}
        />

        <input
          type="number"
          value={quantite}
          onChange={(e) => setQuantite(e.target.value)}
        />

        <button onClick={handleCreate}>Create Sale</button>
      </div>

      {/* List ventes */}
      <div>
        {ventes.map((v) => (
          <div key={v.id}>
            <p>
              Ref: {v.reference} — Status: {v.statut}
            </p>

            <button onClick={() => annulerVente(v.id)}>
              Cancel Sale
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}