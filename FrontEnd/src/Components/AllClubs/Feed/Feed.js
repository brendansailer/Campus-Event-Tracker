import React from "react";
import { useEffect, useState } from "react";
// import NewEvent from "./NewEvent/NewEvent.js";
import Club from "./Club.js";
import "./Feed.css";
import { getCurrentUser } from "../../../Common/Services/AuthService";
//import { getUserSubscriptions } from "../../../Common/Services/SubscriptionService";
import { getDBUser } from "../../../Common/Services/UserService";

export default function Feed() {
  const [clubs, setClubs] = useState([]);
  var currentUser = getCurrentUser();

  useEffect(() => {
    getDBUser(currentUser.get("username"), currentUser.get("email"))
      .then((user) => {
        console.log("THIS IS USER " + user.user_id)
        fetch('/clubs/' + user.user_id, {
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
            setClubs(data)
        })
      })

  }, [currentUser]);

  return (
    <div className="feed">
      <div>
        <h2 className="feed-header">
          All Clubs
        </h2>
      </div>
      {/* <NewEvent refreshFeed={refreshFeed} /> */}
      <div className="club-info-container">
        {clubs.map((club) => (
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
