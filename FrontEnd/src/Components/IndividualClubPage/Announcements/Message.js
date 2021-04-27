import React from "react";
import "./Message.css";

export default function Message(props) {
  return (
    <div className="message">
      <div className="message-container">
        <h5 className="message-time">{props.event_start} to {props.event_end}</h5>
      </div>
      <p className="message-text">{props.description}</p>
    </div>
  );
}
