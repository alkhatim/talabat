const INIT_STATE = {
  layoutType: "vertical",
  layoutWidth: "fluid",
  leftSideBarTheme: "dark",
  leftSideBarType: "default",
  topbarTheme: "dark",
  isPreloader: false,
  showRightSidebar: false,
  isMobile: false,
  showSidebar: true,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "CHANGE_LAYOUT":
      return {
        ...state,
        layoutType: action.payload,
      };
    case "CHANGE_PRELOADER":
      return {
        ...state,
        isPreloader: action.payload,
      };

    case "CHANGE_LAYOUT_WIDTH":
      return {
        ...state,
        layoutWidth: action.payload,
      };
    case "CHANGE_SIDEBAR_THEME":
      return {
        ...state,
        leftSideBarTheme: action.payload,
      };
    case "CHANGE_SIDEBAR_TYPE":
      return {
        ...state,
        leftSideBarType: action.payload.sidebarType,
      };
    case "CHANGE_TOPBAR_THEME":
      return {
        ...state,
        topbarTheme: action.payload,
      };
    case "SHOW_RIGHT_SIDEBAR":
      return {
        ...state,
        showRightSidebar: action.payload,
      };
    case "SHOW_SIDEBAR":
      return {
        ...state,
        showSidebar: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
