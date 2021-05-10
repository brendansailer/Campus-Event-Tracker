import React from "react";
import "./StandaloneEvent.css";

export default function StandaloneEvent(props) {
  return (
    <div className="event">
      {props.event_img && <img className="event-image" src={props.event_img} alt="profile"></img>}
      <div className="event-info">
        <h2 className="event-club">HOST: {props.club_name}</h2>
      </div>
      <div>
        <h5 className="event-text">TIMING: {props.event_start} to {props.event_end}</h5>
        <p className="event-text">DESCRIPTION: {props.description}</p>
        <p className="event-text">WHERE: {props.location}</p>
      </div>
    </div>
  );
}
