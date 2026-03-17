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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Medicaments</h1>

      {/* Form */}
      <MedicamentForm onAdd={addMedicament} />

      {/* List */}
      <div>
        {medicaments.map((med) => (
          <div key={med.id}>
            <p>
              {med.nom} — Stock: {med.stock_actuel}
            </p>

            <button onClick={() => removeMedicament(med.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}