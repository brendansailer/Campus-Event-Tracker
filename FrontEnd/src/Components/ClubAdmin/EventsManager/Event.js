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
        <p className="event-time">Event Start: {props.event_start}</p>
      </div>
      <div className="event-info">
        <p className="event-time">Event End: {props.event_end}</p>
      </div>
      <p className="event-text">Description: {props.description}</p>
      <Link className="event-link" to={"/event/" + props.event_id}> Go event page </Link>
    </div>
  );
}
