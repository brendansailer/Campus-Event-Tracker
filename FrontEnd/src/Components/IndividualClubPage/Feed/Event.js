import React from "react";
import "./Event.css";
import { useHistory  } from "react-router-dom";

export default function Event(props) {
  const history = useHistory();
  const goToPage = (event_id) => () => {
    history.push("/event/" + event_id);
  }

  return (
    <div className="event-single" onClick={goToPage(props.event_id)}>
      {props.event_img && <img className="event-image" src={props.event_img} alt="profile"></img>}
      <div className="event-info">
        <h2 className="event-club">{props.club_name}</h2>
      </div>
      <div className="event-info">
          <h5 className="event-time">{props.event_start} - {props.event_end}</h5>
      </div>
      <p className="event-text">{props.description}</p>
    </div>
  );
}
