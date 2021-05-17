import React from "react";
import { Button } from "react-bootstrap"
import "./StandaloneEvent.css";
import { useHistory } from "react-router-dom";

export default function StandaloneEvent(props) {
  let history = useHistory();

  return (
    <div className="individual-event">
      {props.event_img && <img className="event-image" src={props.event_img} alt="profile"></img>}
      <div className="event-info">
        <h2 className="event-club">Title: {props.title}</h2>
      </div>
      <div className="event-info">
        <h2 className="event-club">HOST: {props.club_name}</h2>
      </div>
      <div>
        <h5 className="event-text">START: {props.event_start}</h5>
        <h5 className="event-text">END: {props.event_end}</h5>
        <h5 className="event-text">DESCRIPTION: {props.description}</h5>
        {props.location && <h5 className="event-text">WHERE: {props.location}</h5>}
      </div>
      <div className="rsvp-button">
        {props.rsvp ? <h5 className="rsvp-attending">attending</h5> : <Button className="rsvp" onClick={props.onRSVP} variant="primary">RSVP</Button>}
      </div>
      <div className="rsvp-button">
        <Button className="back-button" onClick={() => history.goBack()} variant="danger">Back</Button>
      </div>
    </div>
  );
}
