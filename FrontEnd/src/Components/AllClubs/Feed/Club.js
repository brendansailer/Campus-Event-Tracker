import React from "react";
import "./Club.css";

export default function Club(props) {
  // const date = new Date(props.event_start);
  return (
    <div className="club">
      {props.name}
      <p className="club-text">{props.description}</p>
    </div>
  );
}
