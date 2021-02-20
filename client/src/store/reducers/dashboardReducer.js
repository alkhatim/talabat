const INIT_STATE = {
  categories: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "CATEGORIES_LOADED":
      return {
        ...state,
        categories: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
