import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default ({ to, className, children }) => {
  const dispatch = useDispatch();
  const layout = useSelector((store) => store.layout);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  function tToggle() {
    if (!isMobile || layout.leftSideBarType !== "condensed") return;

    dispatch({
      type: "CHANGE_SIDEBAR_TYPE",
      payload: { sidebarType: "default", isMobile },
    });
  }

  return (
    <Link to={to} className={className} onClick={tToggle}>
      {children}
    </Link>
  );
};
