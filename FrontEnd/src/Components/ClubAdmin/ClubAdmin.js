import React from "react";
import Nav from "../Nav/Nav";
import "./ClubAdmin.css";
import NewEvent from "./NewEvent/NewEvent";
import { useEffect, useState } from "react";
import NewAnnouncement from "./NewAnnouncement/NewAnnouncement";
import EventsManager from "./EventsManager/EventsManager";
import AnnouncementsManager from "./AnnouncementsManager/AnnouncementsManager";
import ClubMembers from "./ClubMembership/ClubMembership";
import { getCurrentUser } from "../../Common/Services/AuthService";
import { getDBUser } from "../../Common/Services/UserService";
import { getClubMembers } from "../../Common/Services/MembershipService";


const ClubAdmin = (props) => {
  const [club, setClub] = useState({});
  const [dbUser, setDbUser] = useState({});
  const [show, setShow] = useState(true);
  const currentUser = getCurrentUser();

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

  // Check if user is an admin
  useEffect(() => {
    getClubMembers(props.match.params.clubId).then(response => response.json()).then(data => {
        data.forEach(element => {
          if(element.user_id === dbUser && element.rank == "1") {
            setShow(false);
          }
        });
    })
  }, [props.match.params.clubId, dbUser]);

  useEffect(() => {
    getDBUser(currentUser.get("username"), currentUser.get("email"))
      .then((user) => {
        setDbUser(user.user_id);
      })
  }, [currentUser])

  return (
    <div className='page'>
      <div className="grid-container">
        <div className="club-admin-nav-container">
          <Nav></Nav>
        </div>
        <div className={show ? 'hidden' : "club-admin-feed-container"}>
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
        <div className={show ? 'hidden' : "club-admin-discover-container"}>
        <ClubMembers
                  clubId = {props.match.params.clubId}
                  dbUser = {dbUser}
                />
        </div>
      </div>
    </div>
  );
};

export default ClubAdmin;