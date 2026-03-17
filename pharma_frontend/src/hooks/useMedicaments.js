import { useState, useEffect } from "react";
import {
  fetchMedicaments,
  createMedicament,
  deleteMedicament,
  updateMedicament,
} from "../api/medicamentsApi";

/**
 * Custom hook to manage medicaments state and API interactions.
 *
 * Handles:
 * - Fetching medicaments (with filters)
 * - Creating a medicament
 * - Updating a medicament
 * - Deleting a medicament
 *
 * Prevents infinite re-render by extracting only needed filter values.
 */
export const useMedicaments = (filters = {}) => {
  const [medicaments, setMedicaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Extract only necessary values from filters
   * This avoids infinite re-render caused by object reference changes
   */
  const { search = "" } = filters;

  /**
   * Fetch medicaments from API
   */
  const loadMedicaments = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchMedicaments({ search });

      // Handle both paginated and non-paginated responses
      setMedicaments(data.results || data);
    } catch (err) {
      setError("Error loading medicaments");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create a new medicament
   */
  const addMedicament = async (data) => {
    try {
      await createMedicament(data);
      await loadMedicaments(); // refresh list
    } catch (err) {
      setError("Error adding medicament");
    }
  };

  /**
   * Delete a medicament (soft delete)
   */
  const removeMedicament = async (id) => {
    try {
      await deleteMedicament(id);
      await loadMedicaments();
    } catch (err) {
      setError("Error deleting medicament");
    }
  };

  /**
   * Update a medicament
   */
  const editMedicament = async (id, data) => {
    try {
      await updateMedicament(id, data);
      await loadMedicaments();
    } catch (err) {
      setError("Error updating medicament");
    }
  };

  /**
   * Fetch data when search filter changes
   * Avoid using full filters object to prevent infinite loop
   */
  useEffect(() => {
    loadMedicaments();
  }, [search]);

  return {
    medicaments,
    loading,
    error,
    addMedicament,
    removeMedicament,
    editMedicament,
  };
};