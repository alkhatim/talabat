import http from "../../services/http";
import messages from "../../services/messages";

export const getCategories = async () => {
  try {
    const { data } = await http.get("/api/v1/categories");
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const createCategory = async (category) => {
  try {
    const { data } = await http.post("/api/v1/categories", category);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const deleteCategory = async (id) => {
  try {
    const { data } = await http.delete(`/api/v1/categories/${id}`);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const getRates = async () => {
  try {
    const { data } = await http.get(`/api/v1/rates`);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const updateRates = async (rates) => {
  try {
    const { data } = await http.post(`/api/v1/rates`, rates);
    return data;
  } catch (error) {
    messages.error(error);
  }
};
