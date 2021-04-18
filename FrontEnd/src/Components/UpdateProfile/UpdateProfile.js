import React from 'react'
import { useEffect, useState } from "react";
import { getUser, updateUser } from '../../Common/Services/UserService';
import { useHistory, useParams } from "react-router-dom";
import "./UpdateProfile.css"
import { getCurrentUser } from '../../Common/Services/AuthService';

export default function UpdateProfile() {
  console.log("in updateProfile")
  const history = useHistory();
  const { userId } = useParams();
  const [username, setUsername] = useState([]);
  const [profileImage, setProfileImage] = useState([]);
  const [profileBody, setProfileBody] = useState([]);
  useEffect(() => {
    if (!getCurrentUser()) {
      console.error("AUTHENTICATION ERROR");
      history.push("/login");
      return null;
    }
    if (getCurrentUser().id !== userId) {
      console.error("YOU SHOULD NOT BE HERE!");
      history.push("/home-auth");
      return null;
    }
    return getUser(userId).then((user) => {
      setUsername(user.get("username"));
      setProfileImage(user.get("profile_image")._url);
      setProfileBody(user.get("profileBody"))
    });
  }, [userId, history]);

  // Generic setter to store state of form updates
  const handleInputUpdate = (setter) => (event) => {
    event.preventDefault();
    setter(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(userId, {profileBody});
    history.push('/profile/' + userId)
  }

  return (
    <div className="update-profile">
      <div><img src={profileImage} alt={username} className="profile-img"></img></div>        
      <div><h2 className="banner-username">{username}</h2></div>
      <form>
        <input type="text" className="profile-body-update" value={profileBody} onChange={handleInputUpdate(setProfileBody)}></input><br /><br />
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary new-post-btn" onClick={handleSubmit}>Save Changes</button>
        </div>
      </form>
    </div>
  );
}