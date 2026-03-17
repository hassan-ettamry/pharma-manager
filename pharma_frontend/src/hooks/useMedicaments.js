import { useState, useEffect } from "react";
import {
  fetchMedicaments,
  createMedicament,
  deleteMedicament,
  updateMedicament,
} from "../api/medicamentsApi";

export const useMedicaments = (filters = {}) => {
  const [medicaments, setMedicaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMedicaments = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchMedicaments(filters);
      setMedicaments(data.results || data);
    } catch (err) {
      setError("Error loading medicaments");
    } finally {
      setLoading(false);
    }
  };

  const addMedicament = async (data) => {
    try {
      await createMedicament(data);
      loadMedicaments();
    } catch (err) {
      setError("Error adding medicament");
    }
  };

  const removeMedicament = async (id) => {
    try {
      await deleteMedicament(id);
      loadMedicaments();
    } catch (err) {
      setError("Error deleting medicament");
    }
  };

  const editMedicament = async (id, data) => {
    try {
      await updateMedicament(id, data);
      loadMedicaments();
    } catch (err) {
      setError("Error updating medicament");
    }
  };

  // reload when filters change
  useEffect(() => {
    loadMedicaments();
  }, [filters]);

  return {
    medicaments,
    loading,
    error,
    addMedicament,
    removeMedicament,
    editMedicament,
  };
};