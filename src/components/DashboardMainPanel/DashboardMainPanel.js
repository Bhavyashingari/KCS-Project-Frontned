import React from "react";
import "./DashboardMainPanel.css"
import LeftPanel from "../../components/LeftPanel/LeftPanel"

const DashboardLeftPane = () => {
    return (
        <div className="main-panel">
            <div className="left-pane"><LeftPanel/></div>
            <div className="middle-pane">Middle</div>
            <div className="right-pane">Right</div>
        </div>
    );
};

export default DashboardLeftPane;
