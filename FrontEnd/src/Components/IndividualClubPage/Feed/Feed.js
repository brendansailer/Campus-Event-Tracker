import React from "react";
import { useEffect, useState } from "react";
import Event from "./Event.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import "./Feed.css";
import { getCurrentUser } from "../../../Common/Services/AuthService.js";
import { getDBUser } from "../../../Common/Services/UserService.js";
import { getUserSubscriptions, subscribeUserToClub } from "../../../Common/Services/SubscriptionService.js";
import { Button } from "react-bootstrap";
import moment from "moment";

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
      fetch('http://18.205.219.249:8001/club/event/' + clubId, {
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
      fetch('http://18.205.219.249:8001/club/' + clubId, {
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
          {isMember ? <h3>subscribed</h3> : <h3><Button className="subscribe-btn" onClick={subscribe}>Join <FontAwesomeIcon icon={faPlus} /></Button></h3>}
        </div>
      </div>
      {events && events.length === 0 ? 
        <div className="feed">
          <p className="feed-text">No Events</p>
          <p className="feed-text-small">Check Back Later</p>
          <p className="feed-text-small">Tell a Club Admin to Post Some!</p><br/><br/>
        </div>
        : 
        <div className="feed">
          <div className="event-info-container">
            {events.map((event) => (
              <Event
                key={event.event_id}
                description={event.event_description}
                club={event.club_id}
                event_img={event.event_img}
                event_start={moment(event.start_time).format("lll")}
                event_end={moment(event.end_time).format("LT")}
                club_name={event.club_name}
                event_id={event.event_id}
                title={event.title}
              />
            ))}
          </div>
        </div>
      }
    </div>
  );
}
