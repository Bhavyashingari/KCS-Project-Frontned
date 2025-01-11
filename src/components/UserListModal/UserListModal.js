import React, { useEffect, useState } from "react";
import "./UserListModal.css";
import toTitleCase from "../../_utils_/commonFunctions";
import { useToast } from "../Toast/ToastContext";
import rightPanelService from "../../services/rightPanelService";
import authService from "../../services/authService";

const UserListModal = ({ roomDetails }) => {
    const { showToast } = useToast();
    const [userList, setUserList] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]); // State to store selected user IDs
    const [isLoading, setIsLoading] = useState(true); // State to track loading status

    // Fetch user list
    const getUserList = async () => {
        try {
            setIsLoading(true);
            const getCurrentUser = await authService.getUserDetails();
            const users = await rightPanelService.getUsersList();
            console.log(users);

            if (Array.isArray(users)) {
                // Filter out the current user based on user_id
                const filteredUsers = users.filter(user => user.id !== getCurrentUser.user_id);
                setUserList(filteredUsers);
            } else {
                setUserList([]);
            }
        } catch (error) {
            console.log("Error Fetching users: ", error);
            setUserList([]);
        } finally {
            setIsLoading(false); // Stop loading spinner after fetching data
        }
    };

    useEffect(() => {
        getUserList();
    }, []);

    // Handle user selection
    const handleUserSelect = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId) // Remove user if already selected
                : [...prevSelected, userId] // Add user if not selected
        );
    };

    // Handle submit
    const handleSubmit = async () => {
        const AddUserObject = {};
        AddUserObject['room_id'] = roomDetails.room_id;
        AddUserObject['user_ids'] = selectedUsers;
        try {
            const response = await rightPanelService.addUsersToRoom(AddUserObject);
            console.log(response)
        }catch(error){
            showToast(`Error while adding user to ${roomDetails.room_name}`, 'error')
        }

        // Perform any action with the selected user IDs, e.g., API call
        showToast("Users selected successfully!", "success");
    };

    return (
        <div className="user-list-modal">
            <div className="user-list">
                {isLoading ? (
                    <p>Loading...</p> // Display a loading spinner or text
                ) : userList.length > 0 ? (
                    userList.map((user) => (
                        <div
                            key={user.id} // Use the unique user ID
                            className={`user-common-div user-item ${selectedUsers.includes(user.id) ? "selected" : ""}`}
                            onClick={() => handleUserSelect(user.id)}
                        >
                            <p>Name: <span>{toTitleCase(user.first_name + " " + user.last_name || "Unknown User")}</span></p>
                            <p>Email: <span>{user.email}</span></p>
                            <p>Username: <span>{user.username}</span></p>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p> // Handle the case when no users are found
                )}
            </div>
            <button
                onClick={handleSubmit}
                className="submit-button"
                disabled={isLoading || selectedUsers.length === 0} // Disable button when loading or no users selected
            >
                Add Users to Room
            </button>
        </div>
    );
};

export default UserListModal;
