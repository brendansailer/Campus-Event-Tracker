import React from "react";
import UserFeed from "./UserFeed";
import UserBanner from "./UserBanner";
import { useParams } from "react-router-dom";
// import "./UserProfile.css"

export default function UserProfile() {
  const { userId } = useParams();

  return (
    <div className="user-profile">
      <UserBanner userId={userId}></UserBanner>
      <UserFeed userId={userId}></UserFeed>
    </div>
  );
}
