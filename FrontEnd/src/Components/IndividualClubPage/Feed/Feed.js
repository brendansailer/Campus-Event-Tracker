import React from "react";
import { useEffect, useState } from "react";
import Event from "./Event.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import "./Feed.css";
import { getCurrentUser } from "../../../Common/Services/AuthService.js";
import { getDBUser } from "../../../Common/Services/UserService.js";
import { getUserSubscriptions, subscribeUserToClub } from "../../../Common/Services/SubscriptionService.js";

export default function Feed(props) {
    let clubId = props.clubId; // Get the URL Parameter
    let subscribed = false;
    const [club, setClub] = useState({});
    const [events, setEvents] = useState([]);
    const [dbUser, setDbUser] = useState({});
    const [isMember, setIsMember] = useState(false);
    const currentUser = getCurrentUser();
    
    // Check if current user is a member so we can show subscribe button
    useEffect(() => {
      getDBUser(currentUser.get("username"), currentUser.get("email"))
        .then((user) => {
          setDbUser(user)
          return getUserSubscriptions(user.user_id)
        })
        .then((subscriptions) => {
          console.log(subscriptions)
          setIsMember(subscriptions.subscriptions.some(s => s.club_id === parseInt(clubId)))
        })
    }, [currentUser, subscribed, clubId])
    
    useEffect(() => {
      fetch('/club/event/' + clubId, {
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
          setEvents(data)
      })
    }, [clubId]);

    useEffect(() => {
      fetch('/club/' + clubId, {
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
    }, [clubId]);

  const subscribe = () => {
    console.log(dbUser.user_id, parseInt(clubId));
    subscribeUserToClub(dbUser.user_id, parseInt(clubId));
    subscribed = true;
    setIsMember(true);
  }
  console.log("CLUB", club);
  console.log("ISMEMBER", isMember)

  return (
    <div>
      <div className="header">
        <h2 className="feed-header">
          {club.club_name}
        </h2>
        <div className="subscribed-field">
          {isMember ? <h3>subscribed</h3> : <h3><button className="subscribe-btn" onClick={subscribe}>Join <FontAwesomeIcon icon={faPlus} /></button></h3>}
        </div>
      </div>
      <div className="feed">
        <div className="event-info-container">
          {events.map((event) => (
            <Event
              key={event.event_id}
              description={event.event_description}
              club={event.club_id}
              event_img={event.event_img}
              event_start={event.start_time}
              club_name={event.club_name}
              event_id={event.event_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
