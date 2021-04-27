import React from "react";

export default function SubscriptionTile(props) {
  // const date = new Date(props.event_start);
  return (
    <div className="subscription-tile">
      <p className="club-name">{props.club_name}</p>
    </div>
  );
}
