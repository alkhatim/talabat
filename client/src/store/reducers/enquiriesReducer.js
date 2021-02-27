const INIT_STATE = {
  enquiries: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ENQUIRIES_LOADED":
      return {
        ...state,
        enquiries: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
