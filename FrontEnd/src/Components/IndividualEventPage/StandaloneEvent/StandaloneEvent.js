import React from "react";
import "./StandaloneEvent.css";

export default function StandaloneEvent(props) {
  // const date = new Date(props.event_start);
  return (
    <div className="event">
      {props.event_img && <img className="event-image" src={props.event_img} alt="profile"></img>}
      <div className="event-info">
        <h2 className="event-club">{props.club_name}</h2>
      </div>
      <div className="event-container">
        <h5 className="event-time">{props.event_start} to {props.event_end}</h5>
      </div>
      <p className="event-text">{props.description}</p>
    </div>
  );
}
