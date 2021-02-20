import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import SimpleBar from "simplebar-react";
import SidebarContent from "./SidebarContent";

const Sidebar = () => {
  const layout = useSelector((store) => store.layout);

  return (
    <>
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          {layout.type !== "condensed" ? (
            <SimpleBar style={{ maxHeight: "100%" }}>
              <SidebarContent />
            </SimpleBar>
          ) : (
            <SidebarContent />
          )}
        </div>
      </div>
    </>
  );
};

export default withRouter(Sidebar);
