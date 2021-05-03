import React from "react";
import "./Club.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function MemberHtml(props) {
  if(props.member === 1) {
    return <p>Susbscribed</p>
  } else {
    return <p>Not Subscribed</p>
  }
}

export default function Club(props) {
  let clubId = props.club_id;
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch('/clubTopic/' + clubId, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }).then(response => response.json()).then(data => {
        setTopics(data)
        console.log(data)
    })
  }, [clubId]);
  return (
    <div className="club">
      <Link className="club-club" to={"/club/" + props.club_id}> {props.name} </Link>
      <MemberHtml
            member={props.member}
      />
      {topics.map((topic) => (
          <p>{topic.topic_description}</p>
        ))}
      <p className="club-text">{props.description}</p>
    </div>
  );
}
