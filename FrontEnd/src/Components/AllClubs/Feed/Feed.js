import React from "react";
import { useEffect, useState } from "react";
import TopicSection from "./TopicSection.js";
import "./Feed.css";

export default function Feed() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch('/clubsgrouped/topics', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }).then(response => response.json()).then(data => {
        console.log(data)
        setTopics(data)
    })
  }, []);

  return (
    <div>
      <div className="header">
        <h2 className="feed-header">All Clubs</h2>
      </div>
      <div classname="big-feed">
        {topics.map((topic) => (
          <TopicSection
            key={topic.topic}
            topic={topic.topic}
            clubs={topic.clubs}
          />
        ))}
      </div>
    </div>
  );
}
