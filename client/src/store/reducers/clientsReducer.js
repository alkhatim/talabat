const INIT_STATE = {
  clients: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "CLIENTS_LOADED":
      return {
        ...state,
        clients: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
