import axiosInstance from "./axiosConfig";

/**
 * Fetch medicaments
 */
export const fetchMedicaments = async (params = {}) => {
  const res = await axiosInstance.get("/medicaments/", { params });
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
 * Delete medicament
 */
export const deleteMedicament = async (id) => {
  await axiosInstance.delete(`/medicaments/${id}/`);
};