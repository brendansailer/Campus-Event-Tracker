import React from "react";
import "./EventsManager.css";
import { getDBUser } from "../../../Common/Services/UserService";
import { getCurrentUser } from "../../../Common/Services/AuthService";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDateString } from "../../../Common/Services/DateService";
import { getClubEvents } from "../../../Common/Services/EventService";
import Event from "./Event";

const EventsManager = (props) => {
  const [events, setEvents] = useState([]);
  var currentUser = getCurrentUser();
  useEffect(() => {
    getClubEvents(props.clubId).then(response => response.json()).then(data => {
        console.log(data)
        setEvents(data)
    })
  }, []);
  /*
  useEffect(() => {
    fetch('/event', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }).then(response => response.json()).then(data => {
        console.log(data)
        setEvents(data)
    })
  }, []);
  */
    
  return (
    <div className="events-container">
      <h3>Manage Events</h3>
        {events.map((event) => (
          <Event
            key={event.event_id}
            description={event.event_description}
            club_id={event.club_id}
            event_img={event.event_img}
            event_start={event.start_time}
            event_end={event.end_time}
            club_name={event.club_name}
            event_id={event.event_id}
          />
        ))}
    </div>
  );
};

export default EventsManager;