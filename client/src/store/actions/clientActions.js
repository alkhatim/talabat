import http from "../../services/http";
import messages from "../../services/messages";

export const getClients = () => async (dispatch) => {
  try {
    const { data } = await http.get("/api/v1/clients");
    dispatch({
      type: "CLIENTS_LOADED",
      payload: data.map((client) => ({
        ...client,
        createdAt: new Date(client.createdAt).toLocaleString([], {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      })),
    });
  } catch (error) {
    messages.error(error);
  }
};

export const getClientsLookup = async () => {
  try {
    const { data } = await http.get("/api/v1/clients/lookup");
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const getClient = async (id) => {
  try {
    const { data } = await http.get(`/api/v1/clients/${id}`);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const createClient = async (client) => {
  try {
    const { data } = await http.post("/api/v1/clients", client);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const updateClient = async (id, client) => {
  try {
    const { data } = await http.put(`/api/v1/clients/${id}`, client);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const deleteClient = async (id) => {
  try {
    const { data } = await http.delete(`/api/v1/clients/${id}`);
    return data;
  } catch (error) {
    messages.error(error);
  }
};
