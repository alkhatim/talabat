import http from "../../services/http";
import messages from "../../services/messages";

export const getEnquiries = () => async (dispatch) => {
  try {
    const { data } = await http.get("/api/v1/enquiries");
    dispatch({
      type: "ENQUIRIES_LOADED",
      payload: data.map((enquiry) => ({
        ...enquiry,
        createdAt: new Date(enquiry.createdAt).toLocaleString([], {
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

export const getEnquiry = async (id) => {
  try {
    const { data } = await http.get(`/api/v1/enquiries/${id}`);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const createEnquiry = async (enquiry) => {
  try {
    const { data } = await http.post("/api/v1/enquiries", enquiry);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const updateEnquiry = async (id, enquiry) => {
  try {
    const { data } = await http.put(`/api/v1/enquiries/${id}`, enquiry);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const addComment = async (id, comment) => {
  try {
    const { data } = await http.post(
      `/api/v1/enquiries/${id}/comment`,
      comment
    );
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const deleteComment = async (id) => {
  try {
    const { data } = await http.delete(`/api/v1/enquiries/${id}/comment`);
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
