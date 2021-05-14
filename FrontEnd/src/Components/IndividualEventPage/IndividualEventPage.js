import Nav from "../Nav/Nav";
import "./IndividualEventPage.css";
import StandaloneEvent from "./StandaloneEvent/StandaloneEvent";
import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import { createRSVP, getDBUser, getUserRSVPs } from "../../Common/Services/UserService";
import { getCurrentUser } from "../../Common/Services/AuthService";

function IndividualEventPage(props) {
  let eventId = props.match.params.eventId;
  const [event, setEvent] = useState([]);
  const [rsvp, setRsvp] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [userId, setUserId] = useState();
  useEffect(() => {
    fetch('/event/' + eventId, {
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
        console.log(data)
        setEvent(data)
    })
  }, [eventId]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    getDBUser(currentUser.get("username"), currentUser.get("email"))
      .then((user) => {
        setUserId(user.user_id);
        console.log("CURRENT USER",user.user_id )
        return getUserRSVPs(user.user_id);
      })
      .then(response => {
        return setRsvp(response.some((r) => r.event_id === parseInt(eventId)))
      })
  }, [eventId]);

  console.log("rsvp", rsvp)
  const onRSVP = (user_id, event_id, likelihood) => () => {
    createRSVP(user_id, event_id, likelihood).then(setButtonPressed(true))
  }

  //Html to be rendered for the IndividualEventPage
  return (
    <div className="page">
      <div className="grid-container">
        <div className="event-nav-container">
          <Nav></Nav>
        </div>
        <div className="event-feed-container">
          <StandaloneEvent
            key={event.event_id}
            description={event.event_description}
            club={event.club_id}
            event_img={event.event_img}
            event_start={moment(event.start_time).format("llll")} // https://medium.com/how-to-react/format-your-date-or-time-in-react-js-using-moment-js-89c5c6e4f174
            club_name={event.club_name}
            event_end={moment(event.end_time).format("llll")}
            rsvp={rsvp || buttonPressed}
            onRSVP={onRSVP(userId, event.event_id, "YES")}
            location={event.location}
          />
        </div>
      </div>
    </div>
  );
}

export default IndividualEventPage;
