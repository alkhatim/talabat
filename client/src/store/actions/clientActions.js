import http from "../../services/http";
import messages from "../../services/messages";

export const getClients = () => async (dispatch) => {
  try {
    const { data } = await http.get("/clients");
    console.log(data);
    dispatch({
      type: "CLIENTS_LOADED",
      payload: data.map((client) => ({
        ...client,
        createdAt: new Date(client.createdAt).toLocaleDateString(),
      })),
    });
  } catch (error) {
    messages.error(error);
  }
};

export const getClientsLookup = async () => {
  try {
    const { data } = await http.get("/clients/lookup");
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const getClient = async (id) => {
  try {
    const { data } = await http.get(`/clients/${id}`);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const createClient = async (client) => {
  try {
    const { data } = await http.post("/clients", client);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const updateClient = async (id, client) => {
  try {
    const { data } = await http.put(`/clients/${id}`, client);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const deleteClient = async (id) => {
  try {
    const { data } = await http.delete(`/clients/${id}`);
    return data;
  } catch (error) {
    messages.error(error);
  }
};
