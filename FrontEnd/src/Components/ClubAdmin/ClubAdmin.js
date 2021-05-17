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
import AdminToggle from "./AdminToggle"


const ClubAdmin = (props) => {
  const [club, setClub] = useState({});
  const [dbUser, setDbUser] = useState({});
  const [show, setShow] = useState(true);
  const currentUser = getCurrentUser();
  const [option, setOption] = useState("");

  const toggleClickHandler = (selection) => () => {
    setOption(selection)
  }

  useEffect(() => {
    fetch('http://18.205.219.249:8001/club/' + props.match.params.clubId, {
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
          if(element.user_id === dbUser && String(element.rank) === "1") {
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
        { !show && <div className="club-admin-feed-container">
            <h2 className="club-admin-header">{club.club_name} Admin Page</h2>
              <AdminToggle clickHandler={toggleClickHandler}></AdminToggle> 
                {option === "create_event" && <NewEvent
                  clubId = {props.match.params.clubId}
                /> }
                {option === "create_announcement" && <NewAnnouncement
                  clubId = {props.match.params.clubId}
                />}
                {option === "manage_events" && <EventsManager
                  clubId = {props.match.params.clubId}
                />}
                {option === "manage_announcements" && <AnnouncementsManager
                  clubId = {props.match.params.clubId}
                />}
        </div> }
        { !show && <div className="club-admin-discover-container">
        <ClubMembers
                  clubId = {props.match.params.clubId}
                  dbUser = {dbUser}
                />
        </div> }
      </div>
    </div>
  );
};

export default ClubAdmin;