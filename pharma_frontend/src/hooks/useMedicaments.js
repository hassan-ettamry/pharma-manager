import { useState, useEffect } from "react";
import {
  fetchMedicaments,
  fetchAlertes,
  fetchCategories,
  createMedicament,
  deleteMedicament,
  updateMedicament,
} from "../api/medicamentsApi";

export const useMedicaments = (filters = {}) => {
  const [medicaments, setMedicaments] = useState([]);
  const [alertes, setAlertes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    search = "",
    categorie = "",
    ordonnance_requise = "",
  } = filters;

  /**
   * Load medicaments with filters
   */
  const loadMedicaments = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchMedicaments({
        search,
        categorie,
        ordonnance_requise,
      });

      setMedicaments(data.results || data);
    } catch {
      setError("Error loading medicaments");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Load alertes (low stock)
   */
  const loadAlertes = async () => {
    try {
      const data = await fetchAlertes();
      setAlertes(data.results || data);
    } catch {
      setError("Error loading alertes");
    }
  };

  /**
   * Load categories 
   */
  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data.results || data);
    } catch {
      setError("Error loading categories");
    }
  };

  /**
   * CRUD operations
   */
  const addMedicament = async (data) => {
    try {
      await createMedicament(data);
      await loadMedicaments();
      await loadAlertes();
    } catch {
      setError("Error adding medicament");
    }
  };

  const removeMedicament = async (id) => {
    try {
      await deleteMedicament(id);
      await loadMedicaments();
      await loadAlertes();
    } catch {
      setError("Error deleting medicament");
    }
  };

  const editMedicament = async (id, data) => {
    try {
      await updateMedicament(id, data);
      await loadMedicaments();
      await loadAlertes();
    } catch {
      setError("Error updating medicament");
    }
  };

  /**
   * Reload when filters change
   */
  useEffect(() => {
    loadMedicaments();
    loadAlertes();
    loadCategories();
  }, [search, categorie, ordonnance_requise]);

  return {
    medicaments,
    alertes,
    categories,
    loading,
    error,
    addMedicament,
    removeMedicament,
    editMedicament,
  };
};