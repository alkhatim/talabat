import http from "../../services/http";
import messages from "../../services/messages";

export const getCategories = async () => {
  try {
    const { data } = await http.get("/categories");
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const createCategory = async (category) => {
  try {
    const { data } = await http.post("/categories", category);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const deleteCategory = async (id) => {
  try {
    const { data } = await http.delete(`/categories/${id}`);
    return data;
  } catch (error) {
    messages.error(error);
  }
};
