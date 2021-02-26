import http from "../../services/http";
import messages from "../../services/messages";

export const getOrders = () => async (dispatch) => {
  try {
    const { data } = await http.get("/api/v1/orders");
    dispatch({
      type: "ORDERS_LOADED",
      payload: data.map((order) => ({
        ...order,
        createdAt: new Date(order.createdAt).toLocaleDateString(),
      })),
    });
  } catch (error) {
    messages.error(error);
  }
};

export const getOrder = async (id) => {
  try {
    const { data } = await http.get(`/api/v1/orders/${id}`);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const getClientOrders = async (id) => {
  try {
    const { data } = await http.get(`/api/v1/orders/client/${id}`);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const createOrder = async (order) => {
  try {
    const { data } = await http.post("/api/v1/orders", order);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const updateOrder = async (id, order) => {
  try {
    const { data } = await http.put(`/api/v1/orders/${id}`, order);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const { data } = await http.post(`/api/v1/orders/${id}/status`, { status });
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const payOrder = async (id, paid) => {
  try {
    const { data } = await http.post(`/api/v1/orders/${id}/pay`, { paid });
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const uploadFile = async (file) => {
  try {
    const { data } = await http.post("/api/v1/files", file);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const getFiles = async (id) => {
  try {
    const { data } = await http.get(`/api/v1/files/${id}`);
    return data;
  } catch (error) {
    messages.error(error);
    return [];
  }
};

export const getFile = async (id) => {
  try {
    const { data } = await http.get(`/api/v1/files/link/${id}`);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const deleteFile = async (id) => {
  try {
    const { data } = await http.delete(`/api/v1/files/${id}`);
    return data;
  } catch (error) {
    messages.error(error);
  }
};
