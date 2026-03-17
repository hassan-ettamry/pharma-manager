import { useState, useEffect } from "react";
import {
  fetchVentes,
  createVente,
  cancelVente,
} from "../api/ventesApi";

/**
 * Hook to manage ventes (sales)
 */
export const useVentes = () => {
  const [ventes, setVentes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Load ventes
   */
  const loadVentes = async () => {
    setLoading(true);
    try {
      const data = await fetchVentes();
      setVentes(data.results || data);
    } catch (err) {
      //setError("Error loading ventes");
      console.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create sale
   */
  const addVente = async (data) => {
    await createVente(data);
    loadVentes();
  };

  /**
   * Cancel sale
   */
  const annulerVente = async (id) => {
    await cancelVente(id);
    loadVentes();
  };

  useEffect(() => {
    loadVentes();
  }, []);

  return {
    ventes,
    loading,
    error,
    addVente,
    annulerVente,
  };
};