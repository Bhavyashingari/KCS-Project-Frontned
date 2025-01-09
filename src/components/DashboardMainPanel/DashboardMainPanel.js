import React from "react";
import "./DashboardMainPanel.css"
import LeftPanel from "../../components/LeftPanel/LeftPanel";
import MiddlePanel from "../MiddlePanel/MiddlePanel";

const DashboardLeftPane = () => {
    return (
        <div className="main-panel">
            <div className="left-pane"><LeftPanel/></div>
            <div className="middle-pane-main"><MiddlePanel/></div>
            <div className="right-pane"></div>
        </div>
    );
};

export default DashboardLeftPane;
