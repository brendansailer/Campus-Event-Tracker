import React from 'react'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../../Common/Services/AuthService';
import { getUser } from '../../../Common/Services/UserService';
import "./UserBanner.css"

export default function UserBanner(props) {
  const [username, setUsername] = useState([]);
  const [profileImage, setProfileImage] = useState([]);
  const [profileBody, setProfileBody] = useState([]);
  const currentUser = getCurrentUser();
  useEffect(() => {
    return getUser(props.userId).then((user) => {
      setUsername(user.get("username"));
      setProfileImage(user.get("profile_image")._url);
      setProfileBody(user.get("profileBody"))
    });
  }, [props.userId, currentUser]);

  return (
    <div className="user-banner">
      <div><img src={profileImage} alt={username} className="profile-img"></img></div>
      <div>
        <h2 className="banner-username">{username}</h2>
      </div>
      <div>
        <p className="profile-body">{profileBody} {currentUser && currentUser.id === props.userId && 
          <Link to={"/profile/" + props.userId + "/update"}>
            <i className="fa fa-pencil"></i>
          </Link>}
        </p>
      </div>
    </div>
  );
}