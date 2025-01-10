import React from "react";
import "./RightPanel.css"
import RightPanelNavbar from "./RightPanelNavbar";

const RightPanel=({data})=>{
    return(
        <div>
            <RightPanelNavbar data={data}/>
        </div>
    )
};

export default RightPanel;