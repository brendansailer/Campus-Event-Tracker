import React from "react";
import Club from "./Club/Club.js";
import "./TopicSection.css";

export default function TopicSection(props) {
  console.log(props)
  return (
    <div>
        <div className="header">
            <h5 className="feed-header">{props.topic}</h5>
        </div>
        <div className="topic-feed">
          {props.clubs.map((club) => (
            <Club
              key={club.club_id}
              club_id={club.club_id}
              description={club.club_description}
              name={club.club_name}
              member={club.club_member}
            />
          ))}
        </div>
    </div>
  );
}
