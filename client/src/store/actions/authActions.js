import http from "../../services/http";
import messages from "../../services/messages";

export const login = (credentials) => async (dispatch) => {
  try {
    const { data, headers } = await http.post("/api/v1/auth", {
      username: credentials.username,
      password: credentials.password,
    });

    if (credentials.rememberMe)
      localStorage.setItem("token", headers["x-token"]);
    else localStorage.setItem("tempToken", headers["x-token"]);

    http.defaultHeader();

    dispatch({
      type: "LOGGED_IN",
      payload: data,
    });
  } catch (error) {
    messages.error(error);
    dispatch({
      type: "LOGIN_FAILED",
    });
  }
};

export const loadUser = () => async (dispatch) => {
  localStorage.removeItem("tempToken");
  const token = localStorage.getItem("token");
  if (!token)
    dispatch({
      type: "LOGIN_FAILED",
    });
  try {
    const { data } = await http.get("/api/v1/auth", {
      headers: { "x-token": token },
    });
    dispatch({
      type: "LOGGED_IN",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILED",
    });
  }
};

export const loadProfile = async () => {
  try {
    const { data } = await http.get("/api/v1/auth");
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const editProfile = async (profile) => {
  try {
    const { data } = await http.put("/api/v1/auth", profile);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const updatePassword = async (password) => {
  try {
    const { data } = await http.put("/api/v1/auth/updatepassword", password);
    return data;
  } catch (error) {
    messages.error(error);
  }
};

export const logout = () => async (dispatch) => {
  localStorage.clear();
  dispatch({
    type: "LOGGED_OUT",
  });
};
