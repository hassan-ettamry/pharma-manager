import axiosInstance from "./axiosConfig";

/**
 * Fetch medicaments (with filters)
 */
export const fetchMedicaments = async (params = {}) => {
  const res = await axiosInstance.get("/medicaments/", { params });
  return res.data;
};

/**
 * Fetch low stock medicaments (alertes)
 */
export const fetchAlertes = async () => {
  const res = await axiosInstance.get("/medicaments/alertes/");
  return res.data;
};

/**
 * Create medicament
 */
export const createMedicament = async (data) => {
  const res = await axiosInstance.post("/medicaments/", data);
  return res.data;
};

/**
 * Delete medicament (soft delete)
 */
export const deleteMedicament = async (id) => {
  await axiosInstance.delete(`/medicaments/${id}/`);
};

/**
 * Update medicament
 */
export const updateMedicament = async (id, data) => {
  const res = await axiosInstance.put(`/medicaments/${id}/`, data);
  return res.data;
};

/**
 * Fetch all categories
 */
export const fetchCategories = async () => {
    const res = await axiosInstance.get("/categories/");
    return res.data;
  };