import React from "react";
import "./EventsManager.css";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getClubEvents } from "../../../Common/Services/EventService";
import Event from "./Event";

const EventsManager = (props) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getClubEvents(props.clubId).then(response => response.json()).then(data => {
        console.log(data)
        setEvents(data)
    })
  }, [props.clubId]);
    
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
            title={event.title}
            location={event.location}
          />
        ))}
    </div>
  );
};

export default EventsManager;