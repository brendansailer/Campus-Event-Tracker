import React from "react";
import Nav from "../Nav/Nav";
import "./ClubAdmin.css";
import NewEvent from "./NewEvent/NewEvent";
import { useEffect, useState } from "react";
import NewAnnouncement from "./NewAnnouncement/NewAnnouncement";
import EventsManager from "./EventsManager/EventsManager";
import AnnouncementsManager from "./AnnouncementsManager/AnnouncementsManager";

const ClubAdmin = (props) => {
  const [club, setClub] = useState({});

  useEffect(() => {
    fetch('/club/' + props.match.params.clubId, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    }).then(response => response.json()).then(data => {
        setClub(data)
    })
  }, [props.match.params.clubId]);

  return (
    <div className="club-admin-page-container">
      <div className="club-admin-grid-container">
        <div className="club-admin-nav-container">
          <Nav></Nav>
        </div>
        <div className="club-admin-info-container">
            <h2 className="club-admin-header">{club.club_name} Admin</h2>
                <NewEvent
                  clubId = {props.match.params.clubId}
                />
                <NewAnnouncement
                  clubId = {props.match.params.clubId}
                />
                <EventsManager
                  clubId = {props.match.params.clubId}
                />
                <AnnouncementsManager
                  clubId = {props.match.params.clubId}
                />
        </div>
      </div>
    </div>
  );
};

export default ClubAdmin;
