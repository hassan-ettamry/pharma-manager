import { useState, useEffect } from "react";
import {
  fetchMedicaments,
  createMedicament,
  deleteMedicament,
} from "../api/medicamentsApi";

/**
 * Hook to manage medicaments state
 */
export const useMedicaments = () => {
  const [medicaments, setMedicaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Load medicaments from API
   */
  const loadMedicaments = async () => {
    setLoading(true);
    try {
      const data = await fetchMedicaments();
      setMedicaments(data.results || data);
    } catch (err) {
      setError("Error loading medicaments");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add new medicament
   */
  const addMedicament = async (data) => {
    await createMedicament(data);
    loadMedicaments();
  };

  /**
   * Delete medicament
   */
  const removeMedicament = async (id) => {
    await deleteMedicament(id);
    loadMedicaments();
  };

  useEffect(() => {
    loadMedicaments();
  }, []);

  return {
    medicaments,
    loading,
    error,
    addMedicament,
    removeMedicament,
  };
};