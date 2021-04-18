import React from "react";
import "./Post.css";

// TODO: include user's profile_image in post
export default function Post(props) {
  return (
    <div className="post">
      <div className="post-user-info">
        <img
          className="post-image"
          src={props.profileImage._url}
          alt="profile"
        ></img>
        <h3 className="post-username">{props.username}</h3>
      </div>
      <p className="post-text">{props.body}</p>
    </div>
  );
}
