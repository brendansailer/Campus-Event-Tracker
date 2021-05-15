import React from "react";
import "./Event.css";
import { useHistory} from "react-router-dom";

export default function Event(props) {
  const history = useHistory();
  const goToPage = (page) => () => {
    history.push(page);
  }

  return (
    <div className="event">
      {props.event_img && <img className="event-image" src={props.event_img} alt="profile"></img>}
      <div className="event-info" onClick={goToPage("/club/" + props.club_id)}>
        <h2 className="event-club-name"> {props.club_name} </h2>
      </div>
      <div onClick={goToPage("/event/" + props.event_id)}>
        <p className="event-text">{props.title}</p>
        <div className="event-info">
          <h5 className="event-time">{props.event_start} - {props.event_end}</h5>
        </div>
        <p className="event-text">{props.description}</p>
      </div>
    </div>
  );
}
