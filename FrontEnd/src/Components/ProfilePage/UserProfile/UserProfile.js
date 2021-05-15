import React, {useEffect, useState} from "react";
import UserSubscriptions from "./UserSubscriptions";
import UserBanner from "./UserBanner";
import { useParams } from "react-router-dom";
import ProfileToggle from "./ProfileToggle"
import NewClub from "./NewClub"
import { getCurrentUser } from "../../../Common/Services/AuthService";
import { getDBUser } from "../../../Common/Services/UserService";
// import "./UserProfile.css"

export default function UserProfile() {
  const { userId } = useParams();
  const [option, setOption] = useState("");
  const [dbUser, setDbUser] = useState({});
  const currentUser = getCurrentUser();

  useEffect(() => {
    setOption("clubs")
    getDBUser(currentUser.get("username"), currentUser.get("email"))
      .then((user) => {
        setDbUser(user)
      })
  }, [currentUser]);
  
  const toggleClickHandler = (selection) => () => {
    setOption(selection)
  }

  return (
    <div className="user-profile">
      <UserBanner userId={userId}></UserBanner>
      <ProfileToggle clickHandler={toggleClickHandler}></ProfileToggle> 
      {option === "clubs" && <UserSubscriptions userId={dbUser.user_id}></UserSubscriptions>}
      {option === "createClub" && <NewClub userId={dbUser.user_id} onClubCreate={toggleClickHandler("clubs")}></NewClub>}
    </div>
  );
}
