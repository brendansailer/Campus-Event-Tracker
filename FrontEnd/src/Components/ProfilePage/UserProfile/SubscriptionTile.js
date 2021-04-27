import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function SubscriptionTile(props) {
  // const date = new Date(props.event_start);
  return (
    <div className="subscription-tile">
      <p className="club-name">{props.club_name}<FontAwesomeIcon className="unsubscribe" icon={faTimes} onClick={props.eventHandler} /></p>
    </div>
  );
}
