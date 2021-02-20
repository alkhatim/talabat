const INIT_STATE = {
  orders: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ORDERS_LOADED":
      return {
        ...state,
        orders: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
