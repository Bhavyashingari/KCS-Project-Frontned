import React from "react";
import "./DashboardMainPanel.css"
import { useState } from "react";
import LeftPanel from "../../components/LeftPanel/LeftPanel";
import MiddlePanel from "../MiddlePanel/MiddlePanel";
import RightPanel from "../RightPanel/RighPanel";

const DashboardLeftPane = () => {
    const [sharedData, setSharedData] = useState({ room_name: "No Room", created_at: null });

    // Function to update shared data from MiddlePanel
    const handleDataFromMiddlePanel = (data) => {
        setSharedData(data);
    };
    return (
        <div className="main-panel">
            <div className="left-pane"><LeftPanel/></div>
            <div className="middle-pane-main"><MiddlePanel onSendData={handleDataFromMiddlePanel} /></div>
            <div className="right-pane"><RightPanel data={sharedData} /></div>
        </div>
    );
};

export default DashboardLeftPane;
