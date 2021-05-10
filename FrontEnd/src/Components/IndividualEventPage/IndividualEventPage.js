import Nav from "../Nav/Nav";
import "./IndividualEventPage.css";
import StandaloneEvent from "./StandaloneEvent/StandaloneEvent";
import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";

function IndividualEventPage(props) {
  let eventId = props.match.params.eventId;
  const [event, setEvent] = useState([]);
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
            location={event.location}
          />
        </div>
      </div>
    </div>
  );
}

export default IndividualEventPage;
