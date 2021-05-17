import React from "react";
import "./Club.css";
import { Link } from "react-router-dom";

export default function Club(props) {
  var class_name
  props.member === 1 ? class_name = "club-subscribed" : class_name = "club-unsubscribed"

  return (<div className="club-tile">
            <div className={class_name}>
              <Link className="club-name" to={"/club/" + props.club_id}> {props.name} </Link>
              <p className="club-text">{props.description}</p>
            </div>
          </div>)
}
