import React, { useEffect, useState } from "react";
import "./RightPanel.css";
import RightPanelNavbar from "./RightPanelNavbar";
import RightPanelInput from "../../components/RightPanelInput/RightPanelInput";
import authService from "../../services/authService";

const RightPanel = ({ data }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const getCurrentUser = async () => {
        try {
            const response = await authService.getUserDetails();
            if (response) {
                setCurrentUser(response);
            }
        } catch (error) {
            console.error(`Error while fetching user data: ${error}`);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    // Check conditions for showing the input
    const shouldShowInput =
        data &&
        data.room_name !== "No Room" &&
        (!data.is_broadcast || (data.is_broadcast && currentUser?.user_id === data.admin_user));

    return (
        <div className="right-panel">
            <RightPanelNavbar data={data} />
            <div className="content-area">
                {/* Add content here */}
            </div>
            {shouldShowInput && <RightPanelInput data={data} />}
        </div>
    );
};

export default RightPanel;
