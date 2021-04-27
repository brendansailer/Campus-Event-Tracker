import React from "react";
import UserSubscriptions from "./UserSubscriptions";
import UserBanner from "./UserBanner";
import { useParams } from "react-router-dom";
// import "./UserProfile.css"

export default function UserProfile() {
  const { userId } = useParams();

  return (
    <div className="user-profile">
      <UserBanner userId={userId}></UserBanner>
      <UserSubscriptions userId={userId}></UserSubscriptions>
    </div>
  );
}
