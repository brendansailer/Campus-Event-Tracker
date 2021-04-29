import React from "react";
import "./Club.css";
import { Link } from "react-router-dom";

export default function Club(props) {
  // const date = new Date(props.event_start);
  return (
    <div className="club">
      <Link className="club-club" to={"/club/" + props.key}> {props.name} </Link>
      <p className="club-text">{props.description}</p>
    </div>
  );
}
