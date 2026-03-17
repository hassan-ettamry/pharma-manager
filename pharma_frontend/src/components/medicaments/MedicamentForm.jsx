import { useState } from "react";

/**
 * Form to create medicament
 */
export default function MedicamentForm({ onAdd }) {
  const [form, setForm] = useState({
    nom: "",
    dci: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      ...form,
      categorie: 1, // temp
      forme: "Comprime",
      dosage: "500mg",
      prix_achat: 5,
      prix_vente: 10,
      stock_actuel: 100,
      stock_minimum: 10,
      date_expiration: "2027-12-01",
      ordonnance_requise: false,
      est_actif: true,
    });

    setForm({ nom: "", dci: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nom"
        value={form.nom}
        onChange={handleChange}
        placeholder="Nom"
      />

      <input
        name="dci"
        value={form.dci}
        onChange={handleChange}
        placeholder="DCI"
      />

      <button type="submit">Add Medicament</button>
    </form>
  );
}