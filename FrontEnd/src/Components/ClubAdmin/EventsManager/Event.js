import React from "react";
import "./Event.css";
import { Link } from "react-router-dom";
import { deleteEvent } from "../../../Common/Services/EventService";

export default function Event(props) {

  function deleteEventHandler(e) {
    e.preventDefault();
    console.log(deleteEvent(props.event_id));
  }

  return (
    <div className="event">
      {props.event_img && <img className="event-image" src={props.event_img} alt="profile"></img>}
      <div className="event-info">
      <button className="delete-button" onClick={deleteEventHandler}>DELETE</button>
        <h3 className="event-time">{props.event_start}</h3>
      </div>
      <div className="event-info">
        <h3 className="event-time">{props.event_end}</h3>
      </div>
      <p className="event-text">{props.description}</p>
      <Link className="event-link" to={"/event/" + props.event_id}> Go event page </Link>
    </div>
  );
}
