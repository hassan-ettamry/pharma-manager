import axiosInstance from "./axiosConfig";

/**
 * Fetch all sales
 * @returns {Promise<Object>} List of ventes
 */
export const fetchVentes = async () => {
  const response = await axiosInstance.get("/ventes/");
  return response.data;
};

/**
 * Create a new sale
 * @param {Object} data - Sale payload
 * @returns {Promise<Object>}
 */
export const createVente = async (data) => {
    try {
      const response = await axiosInstance.post("/ventes/", data);
      return response.data;
    } catch (error) {
      console.log("BACKEND ERROR ", error.response.data);
      throw error;
    }
  };

/**
 * Cancel a sale
 * @param {number} id - Vente ID
 */
export const cancelVente = async (id) => {
  const response = await axiosInstance.post(`/ventes/${id}/annuler/`);
  return response.data;
};