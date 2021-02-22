import React from "react";
import { withRouter } from "react-router-dom";
import SidebarContent from "./SidebarContent";

const Sidebar = () => {
  return (
    <>
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          <SidebarContent />
        </div>
      </div>
    </>
  );
};

export default withRouter(Sidebar);
