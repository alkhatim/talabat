import http from "../../services/http";
import messages from "../../services/messages";

export const getUsers = async (id) => {
  try {
    const { data } = await http.get(`/users/agency/${id}`);
    return data.data;
  } catch (error) {
    messages.error(error);
    return [];
  }
};

export const getUser = async (id) => {
  try {
    const { data } = await http.get(`/users/admin/${id}`);
    return data.data;
  } catch (error) {
    messages.error(error);
  }
};

export const editUser = async (id, user) => {
  try {
    const { data } = await http.put(`/users/admin/${id}`, user);
    return data.data;
  } catch (error) {
    messages.error(error);
  }
};

export const resetUserPassword = async (id) => {
  try {
    const { data } = await http.post(`/users/reset/${id}`);
    return data.data;
  } catch (error) {
    messages.error(error);
  }
};

export const deleteUser = async (id) => {
  try {
    await http.delete(`/users/admin/${id}`);
    return true;
  } catch (error) {
    messages.error(error);
  }
};
