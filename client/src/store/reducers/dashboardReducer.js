const INIT_STATE = {
  categories: [],
  frequency: [],
  status: [],
  notifications: [],
  payment: [],
  widgets: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "CATEGORIES_LOADED":
      return {
        ...state,
        categories: action.payload,
      };
    case "FREQUENCY_LOADED":
      return {
        ...state,
        frequency: action.payload,
      };
    case "STATUS_LOADED":
      return {
        ...state,
        status: action.payload,
      };
    case "NOTIFICATIONS_LOADED":
      return {
        ...state,
        notifications: action.payload,
      };
    case "PAYMENT_LOADED":
      return {
        ...state,
        payment: action.payload,
      };
    case "WIDGETS_LOADED":
      return {
        ...state,
        widgets: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
