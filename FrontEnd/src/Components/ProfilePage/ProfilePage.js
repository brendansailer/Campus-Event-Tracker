import React from "react";
import Nav from "../Nav/Nav";
import UserProfile from "./UserProfile/UserProfile";
import "./ProfilePage.css";

const ProfilePage = () => {
  return (
    <div className="profile-page-container">
      <div className="profile-grid-container">
        <div className="profile-nav-container">
          <Nav></Nav>
        </div>
        <div className="profile-user-container">
          <UserProfile></UserProfile>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
