import http from "../../services/http";
import messages from "../../services/messages";

export const getUsers = async () => {
  try {
    const { data } = await http.get(`/api/v1/users`);
    return data;
  } catch (error) {
    messages.error(error);
    return [];
  }
};

export const getUser = async (id) => {
  try {
    const { data } = await http.get(`/api/v1/users/${id}`);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const addUser = async (user) => {
  try {
    const { data } = await http.post(`/api/v1/users`, user);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const editUser = async (id, user) => {
  try {
    const { data } = await http.put(`/api/v1/users/${id}`, user);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const resetUserPassword = async (id) => {
  try {
    const { data } = await http.post(`/api/v1/users/reset/${id}`);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const deleteUser = async (id) => {
  try {
    await http.delete(`/api/v1/users/${id}`);
    return true;
  } catch (error) {
    messages.error(error);
  }
};
