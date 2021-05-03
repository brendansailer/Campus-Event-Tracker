import React from "react";
import "./Club.css";
import { Link } from "react-router-dom";

function Member_html(props) {
  if(props.member == 1) {
    return <p>Susbscribed</p>
  } else {
    return <p>Not Subscribed</p>
  }
}

export default function Club(props) {
  // const date = new Date(props.event_start);
  return (
    <div className="club">
      <Link className="club-club" to={"/club/" + props.key}> {props.name} </Link>
      <Member_html
            member={props.member}
      />
      <p className="club-text">{props.description}</p>
    </div>
  );
}
