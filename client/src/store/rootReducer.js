import { combineReducers } from "redux";
import layout from "./reducers/layoutReducer";
import auth from "./reducers/authReducer";
import dashboard from "./reducers/dashboardReducer";
import orders from "./reducers/ordersReducer";
import clients from "./reducers/clientsReducer";

const rootReducer = combineReducers({
  layout,
  auth,
  dashboard,
  orders,
  clients,
});

export default rootReducer;
