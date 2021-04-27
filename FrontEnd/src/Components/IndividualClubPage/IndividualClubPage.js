import Nav from "../Nav/Nav";
import "./IndividualClubPage.css";
import Feed from "./Feed/Feed";
import Announcements from "./Announcements/Announcements"
import React from "react";
import { useHistory } from "react-router";
import { getCurrentUser } from "../../Common/Services/AuthService";

function IndividualClubPage(props) {
  const history = useHistory();
  if (!getCurrentUser()) {
    console.error("AUTHENTICATION ERROR");
    history.push("/login");
    return null;
  }

  //Html to be rendered for the IndividualClubPage
  return (
    <div className="page">
      <div className="grid-container">
        <div className="club-nav-container">
          <Nav></Nav>
        </div>
        <div className="club-feed-container">
          <Feed
            clubId = {props.match.params.clubId}
          />
        </div>
        <div className="club-discover-container">
          <Announcements
            clubId = {props.match.params.clubId}
          />
        </div>
      </div>
    </div>
  );
}

export default IndividualClubPage;
