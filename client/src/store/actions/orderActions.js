import http from "../../services/http";
import messages from "../../services/messages";

export const getOrders = () => async (dispatch) => {
  try {
    const { data } = await http.get("/orders");
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
    const { data } = await http.get(`/orders/${id}`);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const createOrder = async (order) => {
  try {
    const { data } = await http.post("/orders", order);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const updateOrder = async (id, order) => {
  try {
    const { data } = await http.put(`/orders/${id}`, order);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const { data } = await http.post(`/orders/${id}/status`, { status });
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const payOrder = async (id, paid) => {
  try {
    const { data } = await http.post(`/orders/${id}/pay`, { paid });
    return data;
  } catch (error) {
    messages.error(error);
  }
};
