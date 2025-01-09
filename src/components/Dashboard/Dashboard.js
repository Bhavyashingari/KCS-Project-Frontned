import React, { useEffect, useState } from "react";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import { useSearchParams, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import DashboardMainPanel from "../DashboardMainPanel/DashboardMainPanel";

const Dashboard = ({ userDetails: initialUserDetails }) => {
  const [userDetails, setUserDetails] = useState(initialUserDetails || null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails) {
      const token = authService.getToken();
      if (token) {
        const details = authService.getUserDetails();
        if (details) {
          if (searchParams.get("user_id") ==details.user_id) {
            setUserDetails(details); // Set user details if token is valid
          } else {
            authService.logout(navigate);
          }
        } else {
          navigate("/home"); // Redirect if token is invalid or expired
        }
      } else {
        navigate("/home"); // Redirect if no token
      }
    }
  }, [userDetails, navigate, searchParams]);

  if (!userDetails) {
    // Render loading state while rehydration happens
    return <div>Loading...</div>;
  }

  return (
    <>
      <DashboardNavbar userDetails={userDetails} />
      <DashboardMainPanel userDetails={userDetails}/>
    </>
  );
};

export default Dashboard;
