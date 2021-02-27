import { combineReducers } from "redux";
import layout from "./reducers/layoutReducer";
import auth from "./reducers/authReducer";
import dashboard from "./reducers/dashboardReducer";
import orders from "./reducers/ordersReducer";
import clients from "./reducers/clientsReducer";
import enquiries from "./reducers/enquiriesReducer";

const rootReducer = combineReducers({
  layout,
  auth,
  dashboard,
  orders,
  clients,
  enquiries,
});

export default rootReducer;
