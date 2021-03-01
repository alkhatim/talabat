import http from "../../services/http";
import messages from "../../services/messages";

export const getCategories = () => async (dispatch) => {
  try {
    const { data } = await http.get(`/api/v1/dashboard/categories`);
    dispatch({ type: "CATEGORIES_LOADED", payload: data });
  } catch (error) {
    messages.error(error);
  }
};

export const getFrequency = () => async (dispatch) => {
  try {
    const { data } = await http.get(`/api/v1/dashboard/ordersfrequency`);
    dispatch({ type: "FREQUENCY_LOADED", payload: data });
  } catch (error) {
    messages.error(error);
  }
};

export const getStatus = () => async (dispatch) => {
  try {
    const { data } = await http.get(`/api/v1/dashboard/ordersstatuses`);
    dispatch({ type: "STATUS_LOADED", payload: data });
  } catch (error) {
    messages.error(error);
  }
};

export const getNotifications = () => async (dispatch) => {
  try {
    const { data } = await http.get(`/api/v1/dashboard/notifications`);
    dispatch({ type: "NOTIFICATIONS_LOADED", payload: data });
  } catch (error) {
    messages.error(error);
  }
};

export const getPayment = () => async (dispatch) => {
  try {
    const { data } = await http.get(`/api/v1/dashboard/payment`);
    dispatch({ type: "PAYMENT_LOADED", payload: data });
  } catch (error) {
    messages.error(error);
  }
};

export const getWidgets = () => async (dispatch) => {
  try {
    const { data } = await http.get(`/api/v1/dashboard/widgets`);
    dispatch({ type: "WIDGETS_LOADED", payload: data });
  } catch (error) {
    messages.error(error);
  }
};
