import React from "react";
import "./Event.css";
import { Link } from "react-router-dom";

export default function Event(props) {
  return (
    <div className="event">
      {props.event_img && <img className="event-image" src={props.event_img} alt="profile"></img>}
      <div className="event-info">
        <h2 className="event-club">{props.club_name}</h2>
        <h3 className="event-time">{props.event_start}</h3>
      </div>
      <p className="event-text">{props.description}</p>
      <Link to={"/event/" + props.event_id}> Go event page </Link>
    </div>
  );
}
