import React from "react";
import "./Club.css";
import { Link } from "react-router-dom";

function SingleClub(props) {
  var class_name
  props.member === 1 ? class_name = "club-subscribed" : class_name = "club-unsubscribed"

  return (<div className={class_name}>
            <Link className="club-name" to={"/club/" + props.club_id}> {props.name} </Link>
            <p className="club-text">{props.description}</p>
          </div>)
}

export default function Club(props) {
  return (
    <SingleClub member={props.member} name={props.name} club_id={props.club_id} description={props.description}/>
  );
}
