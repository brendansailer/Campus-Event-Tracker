import React from "react";
import { useEffect, useState } from "react";
import TopicSection from "./TopicSection.js";
import { getCurrentUser } from "../../../Common/Services/AuthService";
import { getDBUser } from "../../../Common/Services/UserService";
import "./Feed.css";

export default function Feed() {
  const [topics, setTopics] = useState([]);
  const currentUser = getCurrentUser();


  useEffect(() => {
    getDBUser(currentUser.get("username"), currentUser.get("email"))
      .then((user) => {
        fetch('http://18.205.219.249:8001/clubsgrouped/topics/' + user.user_id, {
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
            console.log(data)
            setTopics(data)
        })
      })
  }, [currentUser]);

  return (
    <div>
      <div className="header">
        <h2 className="feed-header">All Clubs</h2>
      </div>
      <div className="big-feed">
        {topics.map((topic) => (
          <TopicSection
            key={topic.topic_id}
            topic={topic.topic}
            clubs={topic.clubs}
          />
        ))}
      </div>
    </div>
  );
}
